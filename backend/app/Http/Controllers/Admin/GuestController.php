<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuestResource;
use App\Models\Guest;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GuestController extends Controller
{
    public function index(Invitation $invitation)
    {
        $this->authorize('view', $invitation);

        return GuestResource::collection($invitation->guests);
    }

    public function store(Request $request, Invitation $invitation)
    {
        $this->authorize('update', $invitation);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'category' => ['nullable', 'string', 'max:50'],
        ]);

        $guest = $invitation->guests()->create($data);

        return new GuestResource($guest);
    }

    public function bulkStore(Request $request, Invitation $invitation)
    {
        $this->authorize('update', $invitation);

        $validated = $request->validate([
            'guests' => ['required', 'array', 'min:1', 'max:1000'],
            'guests.*.name' => ['required', 'string', 'max:150'],
            'guests.*.phone' => ['nullable', 'string', 'max:30'],
            'guests.*.category' => ['nullable', 'string', 'max:50'],
        ]);

        $created = [];
        foreach ($validated['guests'] as $item) {
            $created[] = $invitation->guests()->create([
                'name' => trim($item['name']),
                'phone' => !empty($item['phone']) ? trim((string) $item['phone']) : null,
                'category' => !empty($item['category']) ? trim($item['category']) : 'Keluarga Besar',
                'status_sent' => false,
            ]);
        }

        return GuestResource::collection($created);
    }

    public function update(Request $request, Guest $guest)
    {
        $this->authorize('update', $guest->invitation);

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:150'],
            'phone' => ['sometimes', 'nullable', 'string', 'max:30'],
            'category' => ['sometimes', 'string', 'max:50'],
            'status_sent' => ['sometimes', 'boolean'],
        ]);

        $guest->update($data);

        return new GuestResource($guest);
    }

    public function sendWhatsapp(Request $request, Guest $guest)
    {
        $this->authorize('update', $guest->invitation);

        $validated = $request->validate([
            'message' => ['required', 'string', 'max:4000'],
            'provider' => ['nullable', 'string', 'in:fonnte,wablas,custom,simulation'],
            'api_token' => ['nullable', 'string', 'max:500'],
            'gateway_url' => ['nullable', 'string', 'max:500'],
        ]);

        $rawPhone = preg_replace('/[^0-9]/', '', (string) $guest->phone);
        if (empty($rawPhone)) {
            return response()->json([
                'message' => 'Nomor WhatsApp tamu belum diisi.',
            ], 422);
        }

        if (str_starts_with($rawPhone, '0')) {
            $cleanPhone = '62' . substr($rawPhone, 1);
        } elseif (str_starts_with($rawPhone, '8')) {
            $cleanPhone = '62' . $rawPhone;
        } else {
            $cleanPhone = $rawPhone;
        }

        $provider = $validated['provider'] ?? 'fonnte';
        $apiToken = !empty($validated['api_token'])
            ? trim($validated['api_token'])
            : env('WA_GATEWAY_TOKEN', env('FONNTE_TOKEN', ''));
        $gatewayUrl = !empty($validated['gateway_url'])
            ? trim($validated['gateway_url'])
            : env('WA_GATEWAY_URL', '');

        $deliveryMode = 'simulation';

        if ($provider !== 'simulation' && !empty($apiToken)) {
            try {
                if ($provider === 'fonnte') {
                    $response = Http::timeout(15)
                        ->withHeaders(['Authorization' => $apiToken])
                        ->asForm()
                        ->post($gatewayUrl ?: 'https://api.fonnte.com/send', [
                            'target' => $cleanPhone,
                            'message' => $validated['message'],
                            'countryCode' => '62',
                        ]);

                    if (!$response->successful()) {
                        return response()->json([
                            'message' => 'Gagal mengirim melalui Fonnte Gateway: ' . $response->body(),
                        ], 502);
                    }
                    $deliveryMode = 'fonnte';
                } elseif ($provider === 'wablas') {
                    $response = Http::timeout(15)
                        ->withHeaders(['Authorization' => $apiToken])
                        ->post($gatewayUrl ?: 'https://pati.wablas.com/api/send-message', [
                            'phone' => $cleanPhone,
                            'message' => $validated['message'],
                        ]);

                    if (!$response->successful()) {
                        return response()->json([
                            'message' => 'Gagal mengirim melalui Wablas Gateway: ' . $response->body(),
                        ], 502);
                    }
                    $deliveryMode = 'wablas';
                } elseif ($provider === 'custom' && !empty($gatewayUrl)) {
                    $response = Http::timeout(15)
                        ->withHeaders(['Authorization' => $apiToken])
                        ->post($gatewayUrl, [
                            'phone' => $cleanPhone,
                            'target' => $cleanPhone,
                            'message' => $validated['message'],
                        ]);

                    if (!$response->successful()) {
                        return response()->json([
                            'message' => 'Gagal mengirim melalui Custom WA Gateway: ' . $response->body(),
                        ], 502);
                    }
                    $deliveryMode = 'custom';
                }
            } catch (\Throwable $e) {
                return response()->json([
                    'message' => 'Koneksi ke WhatsApp Gateway gagal: ' . $e->getMessage(),
                ], 502);
            }
        }

        $guest->update(['status_sent' => true]);

        return response()->json([
            'data' => new GuestResource($guest->fresh()),
            'meta' => [
                'mode' => $deliveryMode,
                'target' => $cleanPhone,
            ],
        ]);
    }

    public function destroy(Guest $guest)
    {
        $this->authorize('update', $guest->invitation);

        $guest->delete();

        return response()->json(['message' => 'Guest deleted']);
    }
}
