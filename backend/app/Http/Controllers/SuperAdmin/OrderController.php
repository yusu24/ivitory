<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['user', 'package', 'template', 'invitation'])->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return OrderResource::collection($query->get());
    }

    public function updateStatus(Request $request, Order $order)
    {
        $data = $request->validate([
            'status' => ['required', 'in:pending,paid,expired,failed'],
        ]);

        if ($data['status'] === 'paid') {
            $order->activate();
        } else {
            $order->update(['status' => $data['status']]);
        }

        return new OrderResource($order->load(['user', 'package', 'template', 'invitation']));
    }
}
