import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Resultado = {
  fecha: string;
  competicion: 'Fútbol Sala' | 'Baloncesto' | 'Voleibol';
  encuentro: string;
  resultado: string;
};

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css',
})
export class ResultadosComponent {
  competicion: 'todas' | Resultado['competicion'] = 'todas';

  resultados: Resultado[] = [
    { fecha: '10/10', competicion: 'Fútbol Sala', encuentro: '2º DAM vs 1º Bach B', resultado: '3 - 2' },
    { fecha: '11/10', competicion: 'Baloncesto', encuentro: '1º SMR vs 1º DAM', resultado: '54 - 60' },
    { fecha: '12/10', competicion: 'Voleibol', encuentro: '4º ESO A vs 4º ESO B', resultado: '2 - 1' },
  ];

  get resultadosFiltrados(): Resultado[] {
    if (this.competicion === 'todas') return this.resultados;
    return this.resultados.filter(r => r.competicion === this.competicion);
  }

  onCompeticionChange(event: Event) {
    this.competicion = (event.target as HTMLSelectElement).value as any;
  }
}
