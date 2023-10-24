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
import { MisOrganizacionesComponent } from './Vistas/mis-organizaciones/mis-organizaciones.component';
import { InteraccionVotacionComponent } from './Vistas/interaccion-votacion/interaccion-votacion.component';
import { VotacionComponent } from './Vistas/votacion/votacion.component';
import { EditarOrganizacionComponent } from './Vistas/editar-organizacion/editar-organizacion.component';
import { AgregarVotacionComponent } from './Vistas/agregar-votacion/agregar-votacion.component';
import { ResultadosVotacionComponent } from './Vistas/resultados-votacion/resultados-votacion.component';
const routes: Routes = [{ path: '',canActivate: [RedireccionarIniciadosGuard],component:InicioComponent },
{ path: 'Ajustes',canActivate: [AutenticacionGuard],component: AjustesUsuarioComponent },
{ path: 'interaccionVot',canActivate: [AutenticacionGuard],component: InteraccionVotacionComponent },
{ path: 'MisOrganizaciones',canActivate: [AutenticacionGuard],component: MisOrganizacionesComponent },
{ path: 'crearorganizacion',canActivate: [AutenticacionGuard],component: CrearOrganizacionComponent },
{ path: 'crearLaVotacion',canActivate: [AutenticacionGuard],component: CrearVotacionComponent },
{ path: 'agregarVotacion',canActivate: [AutenticacionGuard],component: AgregarVotacionComponent },
{ path: 'resultadosVot',canActivate: [AutenticacionGuard],component:  ResultadosVotacionComponent},
{ path: 'editarOrg',canActivate: [AutenticacionGuard],component: EditarOrganizacionComponent },
{ path: 'Votacion',canActivate: [AutenticacionGuard],component: VotacionComponent },
{ path: 'registro',canActivate: [RedireccionarIniciadosGuard],component: RegistroUsuariosComponent },
//{ path: 'inicio/sesion', component: SesionIniciadaComponent },
{ path: 'Votaciones',canActivate: [AutenticacionGuard],component: VotacionPComponent },
{ path: 'inicioSesion',canActivate: [AutenticacionGuard],component: SesionIniciadaComponent},
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
