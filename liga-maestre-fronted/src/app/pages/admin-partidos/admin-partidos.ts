import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartidosService, Partido } from '../../services/partidos.service';

@Component({
  selector: 'app-admin-partidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-partidos.html',
  styleUrl: './admin-partidos.css',
})
export class AdminPartidosComponent {
  loading = false;
  error = '';
  ok = '';

  partidos: Partido[] = [];

  // form crear
  competicion = 'Fútbol Sala';
  equipoLocal = '';
  equipoVisitante = '';
  arbitro = '';
  fecha = '';      // input datetime-local
  ubicacion = '';

  // edición inline
  editId: string | null = null;
  edit: any = {};

  constructor(private partidosService: PartidosService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.ok = '';
    this.partidosService.getAll().subscribe({
      next: (data) => {
        this.partidos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudo cargar partidos';
        this.loading = false;
      },
    });
  }

  create(event: Event) {
    event.preventDefault();
    this.error = '';
    this.ok = '';

    if (!this.competicion || !this.equipoLocal || !this.equipoVisitante || !this.arbitro || !this.fecha || !this.ubicacion) {
      this.error = 'Completa todos los campos.';
      return;
    }

    const payload = {
      competicion: this.competicion,
      equipoLocal: this.equipoLocal,
      equipoVisitante: this.equipoVisitante,
      arbitro: this.arbitro,
      fecha: new Date(this.fecha).toISOString(),
      ubicacion: this.ubicacion,
    };

    this.loading = true;
    this.partidosService.create(payload).subscribe({
      next: () => {
        this.ok = 'Partido creado ✅';
        this.loading = false;

        // limpiar form
        this.equipoLocal = '';
        this.equipoVisitante = '';
        this.arbitro = '';
        this.fecha = '';
        this.ubicacion = '';

        this.load();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error creando partido';
        this.loading = false;
      },
    });
  }

  startEdit(p: Partido) {
    this.editId = p._id;
    this.edit = {
      competicion: p.competicion,
      equipoLocal: p.equipoLocal,
      equipoVisitante: p.equipoVisitante,
      arbitro: p.arbitro,
      fecha: this.toLocalDatetimeValue(p.fecha),
      ubicacion: p.ubicacion,
      golesLocal: p.golesLocal ?? '',
      golesVisitante: p.golesVisitante ?? '',
      estado: p.estado ?? 'programado',
    };
  }

  cancelEdit() {
    this.editId = null;
    this.edit = {};
  }

  saveEdit(id: string) {
    this.error = '';
    this.ok = '';
    const payload: any = {
      competicion: this.edit.competicion,
      equipoLocal: this.edit.equipoLocal,
      equipoVisitante: this.edit.equipoVisitante,
      arbitro: this.edit.arbitro,
      fecha: this.edit.fecha ? new Date(this.edit.fecha).toISOString() : undefined,
      ubicacion: this.edit.ubicacion,
      estado: this.edit.estado,
      golesLocal: this.edit.golesLocal === '' ? null : Number(this.edit.golesLocal),
      golesVisitante: this.edit.golesVisitante === '' ? null : Number(this.edit.golesVisitante),
    };

    // limpia undefined
    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    this.loading = true;
    this.partidosService.update(id, payload).subscribe({
      next: () => {
        this.ok = 'Actualizado ✅';
        this.loading = false;
        this.cancelEdit();
        this.load();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error actualizando';
        this.loading = false;
      },
    });
  }

  private toLocalDatetimeValue(iso: string) {
    // 
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  }
}
