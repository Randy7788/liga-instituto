<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Club;
use App\Models\Jugador;
use Illuminate\Foundation\Testing\RefreshDatabase;

class JugadorApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Desactiva middleware de autenticación/autorización para esta práctica
        $this->withoutMiddleware();
    }

    public function test_puede_obtener_lista_de_jugadores(): void
    {
        Jugador::factory()->count(3)->create();

        $response = $this->getJson('/api/jugadores');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_devuelve_estructura_correcta(): void
    {
        $jugador = Jugador::factory()->create();

        $response = $this->getJson('/api/jugadores');

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'nombre' => $jugador->nombre,
                 ]);
    }

    public function test_puede_crear_un_jugador(): void
    {
        $club = Club::factory()->create();

        $data = [
            'nombre' => 'Test Jugador',
            'posicion' => 'Delantero',
            'dorsal' => 9,
            'club_id' => $club->id,
        ];

        $response = $this->postJson('/api/jugadores', $data);

        $response->assertStatus(201);

        $this->assertDatabaseHas('jugadors', [
            'nombre' => 'Test Jugador',
            'club_id' => $club->id,
        ]);
    }

    public function test_error_si_datos_invalidos(): void
    {
        $response = $this->postJson('/api/jugadores', []);

        $response->assertStatus(422);
    }
}