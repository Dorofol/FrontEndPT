import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';

@Component({
  selector: 'app-crear-votacion',
  templateUrl: './crear-votacion.component.html',
  styleUrls: ['./crear-votacion.component.css']
})
export class CrearVotacionComponent {
  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }
  nombre: string | undefined;
  descripcion: string | undefined;
  authService: AutenticacionService;
  fechaInicioVotacion: string | undefined;
  fechaTerminoVotacion: string | undefined;
  contrasenaAdministrador:string | undefined;

  constructor(private _http: HttpClient,private _authService: AutenticacionService) { 
    this.authService = _authService;}

  public onLogoutClick(): void {
    this.authService.logout();
    window.location.href = "/";
  }
  crearVotacion() {
    const data = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      fechaInicioVotacion: this.fechaInicioVotacion,
      contrasenaAdministrador: this.contrasenaAdministrador,
      fechaTerminoVotacion: this.fechaTerminoVotacion
    };
    this.http.post('URL_DEL_API_AQUI', data)
      .subscribe(response => {
        console.log(response);
        alert('Votación creada con éxito!');
      }, error => {
        console.error(error);
        alert('Error al crear la votación.');
      });
  }
}
