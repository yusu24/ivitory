<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::withCount('invitations')
            ->with(['invitations' => function ($query) {
                $query->whereNotNull('package_id')->with('package')->latest()->limit(1);
            }])
            ->latest()
            ->get();

        return UserResource::collection($users);
    }

    public function updateRole(Request $request, User $user)
    {
        abort_unless($request->user()?->isSuperAdmin(), 403, 'Hanya Super Admin yang dapat mengubah role akun.');

        $data = $request->validate([
            'role' => ['required', 'in:superadmin,admin,user'],
        ]);

        abort_if($user->id === $request->user()->id, 422, 'Tidak dapat mengubah role akun sendiri.');

        $user->update(['role' => $data['role']]);

        return new UserResource($user->loadCount('invitations'));
    }

    public function store(Request $request)
    {
        abort_unless($request->user()?->isSuperAdmin(), 403, 'Hanya Super Admin yang dapat membuat akun baru.');

        $data = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'email' => ['required', 'email', 'max:190', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', 'in:superadmin,admin,user'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => $data['role'],
        ]);

        return new UserResource($user->loadCount('invitations'));
    }

    public function update(Request $request, User $user)
    {
        abort_unless($request->user()?->isSuperAdmin(), 403, 'Hanya Super Admin yang dapat mengubah data akun.');

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:150'],
            'email' => ['sometimes', 'required', 'email', 'max:190', 'unique:users,email,'.$user->id],
            'password' => ['nullable', 'string', 'min:6'],
            'role' => ['sometimes', 'required', 'in:superadmin,admin,user'],
        ]);

        if (! empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        if (isset($data['role']) && $user->id === $request->user()->id && $data['role'] !== $user->role) {
            abort(422, 'Tidak dapat mengubah role akun sendiri.');
        }

        $user->update($data);

        return new UserResource($user->loadCount('invitations'));
    }

    public function destroy(Request $request, User $user)
    {
        abort_unless($request->user()?->isSuperAdmin(), 403, 'Hanya Super Admin yang dapat menghapus akun.');
        abort_if($user->id === $request->user()->id, 422, 'Tidak dapat menghapus akun sendiri.');

        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }
}
