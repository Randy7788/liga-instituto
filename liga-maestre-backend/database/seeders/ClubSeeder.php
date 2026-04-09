<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Club;

class ClubSeeder extends Seeder
{
    public function run(): void
    {
        Club::create([
            'nombre' => 'CD Calatrava',
            'ciudad' => 'Ciudad Real',
            'categoria' => 'Senior'
        ]);

        Club::create([
            'nombre' => 'Atlético Maestre',
            'ciudad' => 'Puertollano',
            'categoria' => 'Juvenil'
        ]);

        Club::create([
            'nombre' => 'Sporting IES',
            'ciudad' => 'Daimiel',
            'categoria' => 'Cadete'
        ]);
    }
}
