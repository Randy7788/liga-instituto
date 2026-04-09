<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('partidos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('liga_id')
                ->constrained('ligas')
                ->onDelete('cascade');

            // Dos claves foráneas apuntando a la misma tabla clubs
            $table->foreignId('club_local_id')
                ->constrained('clubs')
                ->onDelete('cascade');

            $table->foreignId('club_visitante_id')
                ->constrained('clubs')
                ->onDelete('cascade');

            $table->date('fecha');
            $table->string('resultado')->nullable(); 
            // Ej: "2-1" (puede ser null si aún no se juega)

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partidos');
    }
};
