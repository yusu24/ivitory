<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\MidtransService;
use Illuminate\Http\Request;

class PaymentWebhookController extends Controller
{
    public function handle(Request $request, MidtransService $midtrans)
    {
        $payload = $request->all();

        abort_unless($midtrans->verifySignature($payload), 403);

        $order = Order::where('midtrans_order_id', $payload['order_id'])->firstOrFail();

        $transactionStatus = $payload['transaction_status'];
        $fraudStatus = $payload['fraud_status'] ?? null;

        if (in_array($transactionStatus, ['capture', 'settlement']) && ($fraudStatus === null || $fraudStatus === 'accept')) {
            if ($order->status !== 'paid') {
                $order->activate();
            }
        } elseif (in_array($transactionStatus, ['deny', 'cancel', 'expire'])) {
            $order->update(['status' => $transactionStatus === 'expire' ? 'expired' : 'failed']);
        }

        return response()->json(['message' => 'ok']);
    }
}
