<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('landing_contents', function (Blueprint $table) {
            $table->string('site_name', 100)->nullable()->default('Invitory')->after('id');
            $table->string('logo_path')->nullable()->after('site_name');
        });
    }

    public function down(): void
    {
        Schema::table('landing_contents', function (Blueprint $table) {
            $table->dropColumn(['site_name', 'logo_path']);
        });
    }
};
