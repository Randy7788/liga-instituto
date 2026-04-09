import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadoresService, JugadorApi } from '../../services/jugadores.service';

type CompeticionKey = '' | 'futbol' | 'baloncesto' | 'voleibol' | 'balonmano';

type Jugador = {
  nombre: string;
  competicion: CompeticionKey;
  competicionLabel: string;
  equipo: string;
  posicion: string;
  dorsal: number;
  modalId: 'jugador1Modal' | 'jugador2Modal' | 'jugador3Modal' | 'jugador4Modal';
};

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugadores.html',
  styleUrl: './jugadores.css',
})
export class JugadoresComponent implements OnInit {
  private jugadoresService = inject(JugadoresService);

  texto = '';
  competicion: CompeticionKey = '';
  equipo = '';

  jugadores: Jugador[] = [];

  ngOnInit(): void {
    this.cargarJugadores();
  }

  cargarJugadores(): void {
    this.jugadoresService.getJugadores().subscribe({
      next: (data: JugadorApi[]) => {
        this.jugadores = data.map((j, index) => this.mapearJugador(j, index));
      },
      error: (error: unknown) => {
        console.error('Error al cargar jugadores', error);
      }
    });
  }

  mapearJugador(j: JugadorApi, index: number): Jugador {
    const competicion = this.normalizarCompeticion(j.competicion ?? '');

    const modalIds: Jugador['modalId'][] = [
      'jugador1Modal',
      'jugador2Modal',
      'jugador3Modal',
      'jugador4Modal',
    ];

    return {
      nombre: j.nombre ?? '',
      competicion,
      competicionLabel: this.obtenerCompeticionLabel(competicion),
      equipo: j.equipo ?? 'Sin equipo',
      posicion: j.posicion ?? 'Sin posición',
      dorsal: j.dorsal ?? 0,
      modalId: modalIds[index % modalIds.length],
    };
  }

  normalizarCompeticion(valor: string): CompeticionKey {
    const v = valor.toLowerCase().trim();

    if (v.includes('futbol')) return 'futbol';
    if (v.includes('baloncesto')) return 'baloncesto';
    if (v.includes('voleibol')) return 'voleibol';
    if (v.includes('balonmano')) return 'balonmano';

    return '';
  }

  obtenerCompeticionLabel(comp: CompeticionKey): string {
    switch (comp) {
      case 'futbol':
        return 'Fútbol Sala';
      case 'baloncesto':
        return 'Baloncesto';
      case 'voleibol':
        return 'Voleibol';
      case 'balonmano':
        return 'Balonmano';
      default:
        return 'Sin competición';
    }
  }

  get equiposDisponibles(): string[] {
    return Array.from(new Set(this.jugadores.map(j => j.equipo))).sort();
  }

  get jugadoresFiltrados(): Jugador[] {
    const t = this.texto.trim().toLowerCase();

    return this.jugadores.filter(j => {
      const coincideNombre = !t || j.nombre.toLowerCase().includes(t);
      const coincideComp = !this.competicion || j.competicion === this.competicion;
      const coincideEquipo = !this.equipo || j.equipo === this.equipo;
      return coincideNombre && coincideComp && coincideEquipo;
    });
  }

  onTextoChange(event: Event): void {
    this.texto = (event.target as HTMLInputElement).value ?? '';
  }

  onCompeticionChange(event: Event): void {
    this.competicion = ((event.target as HTMLSelectElement).value ?? '') as CompeticionKey;
  }

  onEquipoChange(event: Event): void {
    this.equipo = (event.target as HTMLSelectElement).value ?? '';
  }
}