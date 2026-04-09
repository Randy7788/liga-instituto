<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ligas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');    // Liga Local, Liga Regional...
            $table->string('deporte');   // fútbol, baloncesto...
            $table->string('temporada'); // "2025/2026"
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ligas');
    }
};
