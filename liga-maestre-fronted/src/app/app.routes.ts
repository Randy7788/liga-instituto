import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { EquiposComponent } from './pages/equipos/equipos';
import { ResultadosComponent } from './pages/resultados/resultados';
import { ClasificacionesComponent } from './pages/clasificaciones/clasificaciones';
import { JugadoresComponent } from './pages/jugadores/jugadores';
import { ArbitrosComponent } from './pages/arbitros/arbitros';
import { ContactoComponent } from './pages/contacto/contacto';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AdminPartidosComponent } from './pages/admin-partidos/admin-partidos';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'clasificaciones', component: ClasificacionesComponent },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'arbitros', component: ArbitrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-partidos', component: AdminPartidosComponent },
  //{ path: 'mis-partidos', component: MisPartidosComponent },
  { path: '**', redirectTo: '' },
];


