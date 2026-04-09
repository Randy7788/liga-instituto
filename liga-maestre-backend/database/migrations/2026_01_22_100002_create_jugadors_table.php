<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('jugadors', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('posicion'); // Ej: Portero, Defensa...
            $table->unsignedInteger('dorsal'); // dorsal numérico
            $table->foreignId('club_id')
                ->constrained('clubs')
                ->onDelete('cascade'); 
            // Si se borra el club -> se borran sus jugadores

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jugadors');
    }
};
