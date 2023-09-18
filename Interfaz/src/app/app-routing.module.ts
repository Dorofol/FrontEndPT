import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './Vistas/inicio/inicio.component';
import { SesionIniciadaComponent } from './Vistas/sesion-iniciada/sesion-iniciada.component';
import { RegistroUsuariosComponent } from './Vistas/registro-usuarios/registro-usuarios.component';
import { VotacionPComponent } from './Vistas/votacion-p/votacion-p.component';

const routes: Routes = [{ path: '', component: InicioComponent },
{ path: 'registro', component: RegistroUsuariosComponent },
{ path: 'inicio/sesion', component: SesionIniciadaComponent },
{ path: 'votacion', component: VotacionPComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
