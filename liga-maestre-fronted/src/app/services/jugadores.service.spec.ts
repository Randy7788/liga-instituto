import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { JugadoresService, JugadorApi } from './jugadores.service';

describe('JugadoresService', () => {
  let service: JugadoresService;
  let httpMock: HttpTestingController;

  const mockJugadores: JugadorApi[] = [
    {
      id: 1,
      nombre: 'Lucía Gómez',
      competicion: 'futbol',
      equipo: '1º Bach A',
      posicion: 'Delantera',
      dorsal: 10
    },
    {
      id: 2,
      nombre: 'Carlos Pérez',
      competicion: 'baloncesto',
      equipo: '2º ESO B',
      posicion: 'Base',
      dorsal: 7
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        JugadoresService
      ]
    });

    service = TestBed.inject(JugadoresService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener la lista de jugadores mediante GET', () => {
    service.getJugadores().subscribe((jugadores) => {
      expect(jugadores.length).toBe(2);
      expect(jugadores[0].nombre).toBe('Lucía Gómez');
      expect(jugadores[1].equipo).toBe('2º ESO B');
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/api/jugadores');
    expect(req.request.method).toBe('GET');

    req.flush(mockJugadores);
  });

  it('debe devolver una lista vacía si la API responde vacío', () => {
    service.getJugadores().subscribe((jugadores) => {
      expect(jugadores).toEqual([]);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/api/jugadores');
    expect(req.request.method).toBe('GET');

    req.flush([]);
  });

  it('debe manejar un error HTTP', () => {
    service.getJugadores().subscribe({
      next: () => {
  throw new Error('Se esperaba un error HTTP');
},
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/api/jugadores');
    req.flush('Error del servidor', {
      status: 500,
      statusText: 'Server Error'
    });
  });
});