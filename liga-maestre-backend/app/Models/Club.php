<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;

    // Campos permitidos en asignación masiva (create/update)
    protected $fillable = ['nombre', 'ciudad', 'categoria'];

    // Un club tiene muchos jugadores
    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }

    // Partidos en los que juega como local
    public function partidosLocal()
    {
        return $this->hasMany(Partido::class, 'club_local_id');
    }

    // Partidos en los que juega como visitante
    public function partidosVisitante()
    {
        return $this->hasMany(Partido::class, 'club_visitante_id');
    }
}
