<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Liga;
use Illuminate\Http\Request;

class LigaController extends Controller
{
    public function index()
    {
        return response()->json(Liga::all(), 200);
    }

    public function show($id)
    {
        //  liga + partidos + clubes implicados
        $liga = Liga::with(['partidos.clubLocal', 'partidos.clubVisitante'])->find($id);

        if (!$liga) {
            return response()->json(['message' => 'Liga no encontrada'], 404);
        }

        return response()->json($liga, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|min:3|max:100',
            'deporte' => 'required|string|min:3|max:50',
            'temporada' => 'required|string|min:4|max:20'
        ]);

        $liga = Liga::create($validated);

        return response()->json($liga, 201);
    }

    public function update(Request $request, $id)
    {
        $liga = Liga::find($id);

        if (!$liga) {
            return response()->json(['message' => 'Liga no encontrada'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|min:3|max:100',
            'deporte' => 'sometimes|required|string|min:3|max:50',
            'temporada' => 'sometimes|required|string|min:4|max:20'
        ]);

        $liga->update($validated);

        return response()->json($liga, 200);
    }

    public function destroy($id)
    {
        $liga = Liga::find($id);

        if (!$liga) {
            return response()->json(['message' => 'Liga no encontrada'], 404);
        }

        $liga->delete();

        return response()->json(['message' => 'Liga eliminada correctamente'], 200);
    }
}
