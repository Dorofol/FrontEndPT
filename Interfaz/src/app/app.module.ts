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

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SesionIniciadaComponent,
    VotacionPComponent,
    RegistroUsuariosComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
