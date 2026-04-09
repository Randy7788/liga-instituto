<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClubController;
use App\Http\Controllers\Api\JugadorController;
use App\Http\Controllers\Api\LigaController;

// Rutas públicas (consultas)
Route::get('/clubs', [ClubController::class, 'index']);
Route::get('/clubs/{id}', [ClubController::class, 'show']);

Route::get('/jugadores', [JugadorController::class, 'index']);
Route::get('/jugadores/{id}', [JugadorController::class, 'show']);

Route::get('/ligas', [LigaController::class, 'index']);
Route::get('/ligas/{id}', [LigaController::class, 'show']);

// Rutas protegidas por middleware admin (modificar datos)
Route::middleware('admin')->group(function () {
    Route::post('/clubs', [ClubController::class, 'store']);
    Route::put('/clubs/{id}', [ClubController::class, 'update']);
    Route::delete('/clubs/{id}', [ClubController::class, 'destroy']);

    Route::post('/jugadores', [JugadorController::class, 'store']);
    Route::put('/jugadores/{id}', [JugadorController::class, 'update']);
    Route::delete('/jugadores/{id}', [JugadorController::class, 'destroy']);

    Route::post('/ligas', [LigaController::class, 'store']);
    Route::put('/ligas/{id}', [LigaController::class, 'update']);
    Route::delete('/ligas/{id}', [LigaController::class, 'destroy']);
});
