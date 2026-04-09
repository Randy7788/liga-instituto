import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidosService, Partido } from '../../services/partidos.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-mis-partidos',
  imports: [CommonModule],
  templateUrl: './mis-partidos.html',
})
export class MisPartidosComponent implements OnInit {
  partidos: Partido[] = [];
  loading = true;

  constructor(
    private partidosService: PartidosService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();

    if (!user) {
      this.loading = false;
      return;
    }

    if (user.rol === 'arbitro') {
      this.partidosService
        .getPartidosPorArbitro(user.nombre)
        .subscribe({
          next: (p: Partido[]) => {
            this.partidos = p;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al cargar partidos', err);
            this.loading = false;
          }
        });
    } else {
      this.loading = false;
    }
  }
}