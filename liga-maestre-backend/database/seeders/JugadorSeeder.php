<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jugador;

class JugadorSeeder extends Seeder
{
    public function run(): void
    {
        // Jugadores del club 1
        Jugador::create([
            'nombre' => 'Juan Pérez',
            'posicion' => 'Portero',
            'dorsal' => 1,
            'club_id' => 1
        ]);

        Jugador::create([
            'nombre' => 'Carlos Ruiz',
            'posicion' => 'Defensa',
            'dorsal' => 4,
            'club_id' => 1
        ]);

        // Jugadores del club 2
        Jugador::create([
            'nombre' => 'Miguel Torres',
            'posicion' => 'Delantero',
            'dorsal' => 9,
            'club_id' => 2
        ]);
    }
}
