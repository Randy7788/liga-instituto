<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('clubs', function (Blueprint $table) {
            $table->id(); // PK autoincrement
            $table->string('nombre'); // Nombre del club
            $table->string('ciudad'); // Ciudad del club
            $table->string('categoria'); // Categoría (infantil, senior, etc.)
            $table->timestamps(); // created_at y updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clubs');
    }
};
