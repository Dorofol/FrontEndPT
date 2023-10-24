import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './Vistas/inicio/inicio.component';
import { SesionIniciadaComponent } from './Vistas/sesion-iniciada/sesion-iniciada.component';
import { VotacionPComponent } from './Vistas/votacion-p/votacion-p.component';
import { RegistroUsuariosComponent } from './Vistas/registro-usuarios/registro-usuarios.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CrearVotacionComponent } from './Vistas/crear-votacion/crear-votacion.component';
import { CrearOrganizacionComponent } from './Vistas/crear-organizacion/crear-organizacion.component';
import { AjustesUsuarioComponent } from './Vistas/ajustes-usuario/ajustes-usuario.component';
import { MisOrganizacionesComponent } from './Vistas/mis-organizaciones/mis-organizaciones.component';
import { InteraccionVotacionComponent } from './Vistas/interaccion-votacion/interaccion-votacion.component';
import { VotacionComponent } from './Vistas/votacion/votacion.component';
import { EditarOrganizacionComponent } from './Vistas/editar-organizacion/editar-organizacion.component';
import { AgregarVotacionComponent } from './Vistas/agregar-votacion/agregar-votacion.component';
import { ResultadosVotacionComponent } from './Vistas/resultados-votacion/resultados-votacion.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SesionIniciadaComponent,
    VotacionPComponent,
    RegistroUsuariosComponent,
    CrearVotacionComponent,
    CrearOrganizacionComponent,
    AjustesUsuarioComponent,
    MisOrganizacionesComponent,
    InteraccionVotacionComponent,
    VotacionComponent,
    EditarOrganizacionComponent,
    AgregarVotacionComponent,
    ResultadosVotacionComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
