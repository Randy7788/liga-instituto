import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Competicion = 'Fútbol Sala' | 'Baloncesto' | 'Voleibol';

type FilaClasificacion = {
  pos: number;
  equipo: string;
  competicion: Competicion;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  pts: number;
};

@Component({
  selector: 'app-clasificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clasificaciones.html',
  styleUrl: './clasificaciones.css',
})
export class ClasificacionesComponent {
  competicion: 'todas' | Competicion = 'todas';

  clasificacion: FilaClasificacion[] = [
    // Fútbol Sala
    { pos: 1, equipo: '2º DAM', competicion: 'Fútbol Sala', pj: 3, pg: 3, pe: 0, pp: 0, pts: 9 },
    { pos: 2, equipo: '1º Bach B', competicion: 'Fútbol Sala', pj: 3, pg: 2, pe: 0, pp: 1, pts: 6 },
    { pos: 3, equipo: '1º SMR', competicion: 'Fútbol Sala', pj: 3, pg: 1, pe: 0, pp: 2, pts: 3 },

    // Baloncesto (relleno)
    { pos: 1, equipo: '2º Bach A', competicion: 'Baloncesto', pj: 4, pg: 4, pe: 0, pp: 0, pts: 12 },
    { pos: 2, equipo: '1º SMR', competicion: 'Baloncesto', pj: 4, pg: 2, pe: 0, pp: 2, pts: 6 },

    // Voleibol (relleno)
    { pos: 1, equipo: '4º ESO A', competicion: 'Voleibol', pj: 5, pg: 4, pe: 0, pp: 1, pts: 12 },
    { pos: 2, equipo: '4º ESO B', competicion: 'Voleibol', pj: 5, pg: 3, pe: 0, pp: 2, pts: 9 },
  ];

  get clasificacionFiltrada(): FilaClasificacion[] {
    if (this.competicion === 'todas') return this.clasificacion;
    return this.clasificacion.filter(c => c.competicion === this.competicion);
  }

  onCompeticionChange(event: Event) {
    this.competicion = (event.target as HTMLSelectElement).value as any;
  }
}
