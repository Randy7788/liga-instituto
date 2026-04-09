<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Jugador;
use Illuminate\Http\Request;

class JugadorController extends Controller
{
    public function index()
    {
        // with('club') carga el club asociado en el JSON
        return response()->json(Jugador::with('club')->get(), 200);
    }

    public function show($id)
    {
        $jugador = Jugador::with('club')->find($id);

        if (!$jugador) {
            return response()->json(['message' => 'Jugador no encontrado'], 404);
        }

        return response()->json($jugador, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|min:3|max:100',
            'posicion' => 'required|string|min:3|max:50',
            'dorsal' => 'required|integer|min:1|max:99',
            'club_id' => 'required|exists:clubs,id'
        ]);

        $jugador = Jugador::create($validated);

        return response()->json($jugador, 201);
    }

    public function update(Request $request, $id)
    {
        $jugador = Jugador::find($id);

        if (!$jugador) {
            return response()->json(['message' => 'Jugador no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|min:3|max:100',
            'posicion' => 'sometimes|required|string|min:3|max:50',
            'dorsal' => 'sometimes|required|integer|min:1|max:99',
            'club_id' => 'sometimes|required|exists:clubs,id'
        ]);

        $jugador->update($validated);

        return response()->json($jugador, 200);
    }

    public function destroy($id)
    {
        $jugador = Jugador::find($id);

        if (!$jugador) {
            return response()->json(['message' => 'Jugador no encontrado'], 404);
        }

        $jugador->delete();

        return response()->json(['message' => 'Jugador eliminado correctamente'], 200);
    }
}
