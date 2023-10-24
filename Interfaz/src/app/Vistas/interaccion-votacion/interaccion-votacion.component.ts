import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { OrganizacionService } from 'src/app/Servicios/organizacion.service';
import { CompartirDatosService } from 'src/app/Servicios/compartir-datos.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-interaccion-votacion',
  templateUrl: './interaccion-votacion.component.html',
  styleUrls: ['./interaccion-votacion.component.css']
})
export class InteraccionVotacionComponent  implements OnDestroy {
    votaciones: any[] = [];
    private subscription: Subscription;
  

  

  public organizaciones: any[] = [];
  datosAguardar: any;
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
  

  constructor(    private router: Router ,private organizacionService: OrganizacionService,private _http: HttpClient,private _authService: AutenticacionService,private compartirDatos: CompartirDatosService) { 
    this.authService = _authService;
    this.subscription = this.compartirDatos.votacionesActual.subscribe(
      votaciones => (this.votaciones = votaciones));
      console.log(this.votaciones)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public onLogoutClick(): void {
    this.authService.logout();
    window.location.href = "/";
  }
  verVotacion(idVot: any){
    this.http.get(`http://localhost:8080/api/votaciones/votacion/${idVot}`)
    .subscribe(
      (candidatos: any) => {
        console.log(candidatos);
   // Encontrar el objeto en this.votaciones que tenga idVotacion igual a idVot
   const votacionSeleccionada = this.votaciones.find(votacion => votacion.idVotacion === idVot);
        
   // Combina los objetos candidatos y votacionSeleccionada
   this.datosAguardar = { ...candidatos, ...votacionSeleccionada };
        
        this.loadVotaciones();
        this.router.navigate(['/Votacion']);
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
