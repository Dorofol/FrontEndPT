import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { OrganizacionService } from 'src/app/Servicios/organizacion.service';
import { CompartirDatosService } from 'src/app/Servicios/compartir-datos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-organizaciones',
  templateUrl: './mis-organizaciones.component.html',
  styleUrls: ['./mis-organizaciones.component.css']
})
export class MisOrganizacionesComponent {
  public organizaciones: any[] = [];
  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }
  authService: AutenticacionService;
  
  datosAguardar : any;

  constructor(
    private router: Router ,private organizacionService: OrganizacionService,private _http: HttpClient,private _authService: AutenticacionService,private compartirDatos: CompartirDatosService) { 
    this.authService = _authService;}

  public onLogoutClick(): void {
    this.authService.logout();
    window.location.href = "/";
  }
  ngOnInit(): void {
    const userId = 4; // Usar el ID de usuario que desees
    this.organizacionService.obtenerPorIdUsuario(userId).subscribe(data => {
      this.organizaciones = data;
    });
  }
  verVotacion(idOrganizacion: number) {
    this.http.get(`http://localhost:8080/api/votaciones/porOrganizacion/${idOrganizacion}`)
      .subscribe(
        (votaciones: any) => {
          console.log(votaciones);
          this.datosAguardar=votaciones;
          
          this.loadVotaciones();
          this.router.navigate(['/interaccionVot']);
        },
        error => {
          console.error('Error al obtener votaciones', error);
        }
      );
  }
  loadVotaciones() {
    // Suponiendo que este método obtiene los datos del API
    console.log(this.datosAguardar);

    // Actualiza las votaciones en el servicio de compartición de datos
    this.compartirDatos.updateVotaciones(this.datosAguardar);
  }
}
