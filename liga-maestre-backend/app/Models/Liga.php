<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Liga extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'deporte', 'temporada'];

    // Una liga tiene muchos partidos
    public function partidos()
    {
        return $this->hasMany(Partido::class);
    }
}
