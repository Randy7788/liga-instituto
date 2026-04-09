import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Partido = {
  _id: string;
  competicion: string;
  equipoLocal: string;
  equipoVisitante: string;
  arbitro: string;
  fecha: string;
  ubicacion: string;
  golesLocal: number | null;
  golesVisitante: number | null;
  estado: string;
};

@Injectable({ providedIn: 'root' })
export class PartidosService {
  private readonly baseUrl = 'http://localhost:3000/api/partidos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.baseUrl);
  }

  getByArbitro(nombre: string): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.baseUrl}/arbitro/${encodeURIComponent(nombre)}`);
  }

  getPartidosPorArbitro(nombre: string): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.baseUrl}/arbitro/${encodeURIComponent(nombre)}`);
  }

  getByEquipo(nombre: string): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.baseUrl}/equipo/${encodeURIComponent(nombre)}`);
  }

  create(payload: any): Observable<Partido> {
    return this.http.post<Partido>(this.baseUrl, payload);
  }

  update(id: string, payload: any): Observable<Partido> {
    return this.http.patch<Partido>(`${this.baseUrl}/${id}`, payload);
  }
}