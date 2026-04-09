import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { JugadoresComponent } from './jugadores';
import { JugadoresService } from '../../services/jugadores.service';

describe('JugadoresComponent', () => {
  let component: JugadoresComponent;
  let fixture: ComponentFixture<JugadoresComponent>;

  const jugadoresServiceMock = {
    getJugadores: () => of([
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
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadoresComponent],
      providers: [
        { provide: JugadoresService, useValue: jugadoresServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe cargar jugadores al iniciar', () => {
    expect(component.jugadores.length).toBe(2);
    expect(component.jugadores[0].nombre).toBe('Lucía Gómez');
  });

  it('debe filtrar jugadores por texto', () => {
    component.texto = 'lucía';
    expect(component.jugadoresFiltrados.length).toBe(1);
    expect(component.jugadoresFiltrados[0].nombre).toBe('Lucía Gómez');
  });
});