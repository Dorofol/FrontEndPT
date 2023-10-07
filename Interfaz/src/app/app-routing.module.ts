import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './Vistas/inicio/inicio.component';
import { SesionIniciadaComponent } from './Vistas/sesion-iniciada/sesion-iniciada.component';
import { RegistroUsuariosComponent } from './Vistas/registro-usuarios/registro-usuarios.component';
import { VotacionPComponent } from './Vistas/votacion-p/votacion-p.component';
import { AutenticacionGuard } from './Servicios/autenticacion.guard'
import { RedireccionarIniciadosGuard } from './Servicios/redireccionar-iniciados.guard'
import { CrearVotacionComponent } from './Vistas/crear-votacion/crear-votacion.component';
import { CrearOrganizacionComponent } from './Vistas/crear-organizacion/crear-organizacion.component';
import { AjustesUsuarioComponent } from './Vistas/ajustes-usuario/ajustes-usuario.component';

const routes: Routes = [{ path: '',canActivate: [RedireccionarIniciadosGuard],component:InicioComponent },
{ path: 'Ajustes',canActivate: [AutenticacionGuard],component: AjustesUsuarioComponent },
{ path: 'crearorganizacion',canActivate: [AutenticacionGuard],component: CrearOrganizacionComponent },
{ path: 'crearLaVotacion',canActivate: [AutenticacionGuard],component: CrearVotacionComponent },
{ path: 'registro',canActivate: [RedireccionarIniciadosGuard],component: RegistroUsuariosComponent },
//{ path: 'inicio/sesion', component: SesionIniciadaComponent },
{ path: 'votacion',canActivate: [RedireccionarIniciadosGuard],component: VotacionPComponent },
{ path: 'inicioSesion',canActivate: [AutenticacionGuard],component: SesionIniciadaComponent},
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
