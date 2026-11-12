<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BankAccountResource;
use App\Models\BankAccount;
use App\Models\Invitation;
use Illuminate\Http\Request;

class BankAccountController extends Controller
{
    public function index(Invitation $invitation)
    {
        $this->authorize('view', $invitation);

        return BankAccountResource::collection($invitation->bankAccounts);
    }

    public function store(Request $request, Invitation $invitation)
    {
        $this->authorize('update', $invitation);

        $data = $request->validate([
            'type' => ['required', 'in:bank,ewallet'],
            'bank_name' => ['required', 'string', 'max:100'],
            'account_number' => ['required', 'string', 'max:50'],
            'account_holder' => ['required', 'string', 'max:150'],
            'order_index' => ['sometimes', 'integer', 'min:0'],
        ]);

        $account = $invitation->bankAccounts()->create($data);

        return new BankAccountResource($account);
    }

    public function update(Request $request, BankAccount $bankAccount)
    {
        $this->authorize('update', $bankAccount->invitation);

        $data = $request->validate([
            'type' => ['required', 'in:bank,ewallet'],
            'bank_name' => ['required', 'string', 'max:100'],
            'account_number' => ['required', 'string', 'max:50'],
            'account_holder' => ['required', 'string', 'max:150'],
            'order_index' => ['sometimes', 'integer', 'min:0'],
        ]);

        $bankAccount->update($data);

        return new BankAccountResource($bankAccount);
    }

    public function destroy(BankAccount $bankAccount)
    {
        $this->authorize('update', $bankAccount->invitation);

        $bankAccount->delete();

        return response()->json(['message' => 'Bank account deleted']);
    }

    public function reorder(Request $request, Invitation $invitation)
    {
        $this->authorize('update', $invitation);

        $data = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:bank_accounts,id'],
        ]);

        foreach ($data['order'] as $index => $id) {
            BankAccount::where('id', $id)
                ->where('invitation_id', $invitation->id)
                ->update(['order_index' => $index]);
        }

        return BankAccountResource::collection($invitation->bankAccounts()->get());
    }
}
