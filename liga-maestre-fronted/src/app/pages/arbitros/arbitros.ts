import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type DeporteKey = '' | 'futbol' | 'baloncesto' | 'voleibol' | 'balonmano';

type Arbitro = {
  nombre: string;
  deporte: DeporteKey;
  deporteLabel: string;
  experiencia: string;
  partidos: number;
  modalId: 'arbitro1Modal' | 'arbitro2Modal' | 'arbitro3Modal' | 'arbitro4Modal';
};

@Component({
  selector: 'app-arbitros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arbitros.html',
  styleUrl: './arbitros.css',
})
export class ArbitrosComponent {
  texto = '';
  deporte: DeporteKey = '';

  arbitros: Arbitro[] = [
    {
      nombre: 'Laura Pérez',
      deporte: 'futbol',
      deporteLabel: 'Fútbol Sala',
      experiencia: '3 temporadas',
      partidos: 42,
      modalId: 'arbitro1Modal',
    },
    {
      nombre: 'Sergio Martín',
      deporte: 'baloncesto',
      deporteLabel: 'Baloncesto',
      experiencia: '5 temporadas',
      partidos: 60,
      modalId: 'arbitro2Modal',
    },
    {
      nombre: 'Ana López',
      deporte: 'voleibol',
      deporteLabel: 'Voleibol',
      experiencia: '2 temporadas',
      partidos: 25,
      modalId: 'arbitro3Modal',
    },
    {
      nombre: 'Carlos Díaz',
      deporte: 'balonmano',
      deporteLabel: 'Balonmano',
      experiencia: '4 temporadas',
      partidos: 38,
      modalId: 'arbitro4Modal',
    },
  ];

  get arbitrosFiltrados(): Arbitro[] {
    const t = this.texto.trim().toLowerCase();

    return this.arbitros.filter(a => {
      const coincideNombre = !t || a.nombre.toLowerCase().includes(t);
      const coincideDep = !this.deporte || a.deporte === this.deporte;
      return coincideNombre && coincideDep;
    });
  }

  onTextoChange(event: Event) {
    this.texto = (event.target as HTMLInputElement).value ?? '';
  }

  onDeporteChange(event: Event) {
    this.deporte = ((event.target as HTMLSelectElement).value ?? '') as DeporteKey;
  }
}
