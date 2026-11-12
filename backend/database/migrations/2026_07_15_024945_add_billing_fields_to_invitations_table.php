<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            $table->foreignId('package_id')->nullable()->after('user_id')->constrained()->nullOnDelete();
            $table->foreignId('order_id')->nullable()->after('package_id')->constrained()->nullOnDelete();
            $table->timestamp('expires_at')->nullable()->after('is_published');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            $table->dropConstrainedForeignId('package_id');
            $table->dropConstrainedForeignId('order_id');
            $table->dropColumn('expires_at');
        });
    }
};
