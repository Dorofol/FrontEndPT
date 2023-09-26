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
