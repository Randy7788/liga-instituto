<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Club;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    // GET /api/clubs -> listar todos
    public function index()
    {
        return response()->json(Club::all(), 200);
    }

    // GET /api/clubs/{id} -> mostrar uno
    public function show($id)
    {
        $club = Club::with('jugadores')->find($id);

        if (!$club) {
            return response()->json(['message' => 'Club no encontrado'], 404);
        }

        return response()->json($club, 200);
    }

    // POST /api/clubs -> crear
    public function store(Request $request)
    {
        // Validación: evita guardar datos incorrectos
        $validated = $request->validate([
            'nombre' => 'required|string|min:3|max:100',
            'ciudad' => 'required|string|min:2|max:100',
            'categoria' => 'required|string|min:3|max:50',
        ]);

        $club = Club::create($validated);

        return response()->json($club, 201);
    }

    // PUT /api/clubs/{id} -> actualizar
    public function update(Request $request, $id)
    {
        $club = Club::find($id);

        if (!$club) {
            return response()->json(['message' => 'Club no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|min:3|max:100',
            'ciudad' => 'sometimes|required|string|min:2|max:100',
            'categoria' => 'sometimes|required|string|min:3|max:50',
        ]);

        $club->update($validated);

        return response()->json($club, 200);
    }

    // DELETE /api/clubs/{id} -> eliminar
    public function destroy($id)
    {
        $club = Club::find($id);

        if (!$club) {
            return response()->json(['message' => 'Club no encontrado'], 404);
        }

        $club->delete();

        return response()->json(['message' => 'Club eliminado correctamente'], 200);
    }
}
