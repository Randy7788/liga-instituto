import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type JugadorApi = {
  id?: number;
  nombre: string;
  competicion?: string;
  equipo?: string;
  posicion?: string;
  dorsal?: number;
};

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/jugadores';

  getJugadores(): Observable<JugadorApi[]> {
    return this.http.get<JugadorApi[]>(this.apiUrl);
  }
}