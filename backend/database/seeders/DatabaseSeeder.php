<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'makeproject240696@gmail.com'],
            [
                'name' => 'M Yusuf Effendi (Super Admin)',
                'password' => 'Aku240696@',
                'role' => 'superadmin',
                'email_verified_at' => now(),
            ]
        );
    }
}
