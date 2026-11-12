<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Invitation;
use App\Models\Order;
use App\Models\Package;
use App\Models\Template;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request, MidtransService $midtrans)
    {
        $data = $request->validate([
            'invitation_id' => ['required', 'integer', 'exists:invitations,id'],
            'package_id' => ['required', 'integer', 'exists:packages,id'],
            'template_id' => ['required', 'integer', 'exists:templates,id'],
        ]);

        $invitation = Invitation::findOrFail($data['invitation_id']);
        $this->authorize('update', $invitation);

        $package = Package::findOrFail($data['package_id']);
        abort_unless($package->is_active, 422, 'Paket tidak tersedia.');

        $template = Template::findOrFail($data['template_id']);
        abort_unless(
            $template->is_active || (int) $invitation->template_id === (int) $template->id,
            422,
            'Template tidak tersedia.'
        );

        $order = Order::create([
            'user_id' => $request->user()->id,
            'package_id' => $package->id,
            'template_id' => $template->id,
            'invitation_id' => $invitation->id,
            'midtrans_order_id' => 'ORD-'.Str::upper(Str::random(10)).'-'.$invitation->id,
            'status' => 'pending',
            'amount' => $package->price + $template->price,
        ]);

        $snapToken = $midtrans->createSnapToken($order);
        $order->update(['snap_token' => $snapToken]);

        return response()->json([
            'order' => new OrderResource($order),
            'snap_token' => $snapToken,
        ]);
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order->invitation);

        return new OrderResource($order);
    }
}
