import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { JugadoresComponent } from './jugadores';
import { JugadoresService, JugadorApi } from '../../services/jugadores.service';

describe('JugadoresComponent', () => {
  let component: JugadoresComponent;
  let fixture: ComponentFixture<JugadoresComponent>;

  const mockJugadores: JugadorApi[] = [
    {
      id: 1,
      nombre: 'Lucía Gómez',
      competicion: 'futbol',
      equipo: '2º DAM',
      posicion: 'Cierre',
      dorsal: 5,
    },
    {
      id: 2,
      nombre: 'David Hernández',
      competicion: 'baloncesto',
      equipo: '1º SMR',
      posicion: 'Base',
      dorsal: 7,
    },
  ];

  const jugadoresServiceMock = {
    getJugadores: vi.fn(() => of(mockJugadores)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadoresComponent],
      providers: [
        { provide: JugadoresService, useValue: jugadoresServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar jugadores al iniciar', () => {
    expect(component.jugadores.length).toBe(2);
    expect(component.jugadores[0].nombre).toBe('Lucía Gómez');
  });

  it('debe filtrar por texto', () => {
    component.texto = 'lucía';
    const filtrados = component.jugadoresFiltrados;

    expect(filtrados.length).toBe(1);
    expect(filtrados[0].nombre).toContain('Lucía');
  });

  it('debe filtrar por competición', () => {
    component.competicion = 'futbol';
    const filtrados = component.jugadoresFiltrados;

    expect(filtrados.length).toBe(1);
    expect(filtrados[0].competicion).toBe('futbol');
  });

  it('debe devolver equipos disponibles sin repetir', () => {
    expect(component.equiposDisponibles).toContain('1º SMR');
    expect(component.equiposDisponibles).toContain('2º DAM');
  });
});