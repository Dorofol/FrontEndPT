import { Component, OnInit } from '@angular/core';
import { User } from '../../Modelos/user';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { OrganizacionService } from 'src/app/Servicios/organizacion.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompartirDatosService } from 'src/app/Servicios/compartir-datos.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sesion-iniciada',
  templateUrl: './sesion-iniciada.component.html',
  styleUrls: ['./sesion-iniciada.component.css']
})
export class SesionIniciadaComponent implements OnInit {
  
  user:User= new User()
  authService: AutenticacionService;
  userinformacion: any;
  nombreCompleto: string = '';
  email: string = '';
  rolSistema: string = '';
  votacionesActivas: any[] = [];
  votacionesInactivas: any[] = [];
  
  token: any;
  datosAguardar: any;
  subscription: any;
  votaciones: any;
  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }

  public DataSource:type[] = [
    {id: 1, text: 'Sentence 1'},
    {id: 2, text: 'Sentence 2'},
    {id: 3, text: 'Sentence 3'},
    {id: 4, text: 'Sentenc4 '},
];
  
constructor(    private router: Router ,private organizacionService: OrganizacionService,private _http: HttpClient,private _authService: AutenticacionService,private compartirDatos: CompartirDatosService) { 
  this.authService = _authService;
  this.token= this.authService.getToken()   
}

ngOnInit(): void {
  const userInfo = this.authService.getDecodedToken(this.token);
  
  if (this.token) {
      //console.log(userInfo);
      this.userinformacion=userInfo;
      if(userInfo) {
        this.nombreCompleto = userInfo.nombreCompleto || '';
        this.email = userInfo.email || '';
        this.rolSistema = userInfo.rolSistema || '';
      }
  } else {
      console.log("No hay token disponible");
  } 
    const userId = userInfo.idUsuario; // Usar el ID de usuario que desees
    this.organizacionService.obtenerPorIdUsuario(userId).subscribe(data => {
      //console.log(data)
      data.forEach(org => {
        //console.log(org)
        this.http.get(`http://localhost:8080/api/votaciones/porOrganizacion/${org.idOrganizacion}`)
          .subscribe( (votaciones: any) => {
            votaciones.forEach((votacion: any) => {
              votacion.nombreOrganizacion = org.nombreOrganizacion;

              console.log(votacion)
              if(votacion.estatus === 'Activa') {
                this.votacionesActivas.push(votacion);
              } else {
                this.votacionesInactivas.push(votacion);
              }
            });
            
          });
      });
      
    });
}
async verVotacion(idOrg: any, idVot: any) {
  // Crea observables para ambas llamadas HTTP
  const votaciones$ = this.http.get(`http://localhost:8080/api/votaciones/porOrganizacion/${idOrg}`);
  const candidatos$ = this.http.get(`http://localhost:8080/api/votaciones/votacion/${idVot}`);

  // Usa forkJoin para esperar a que ambas llamadas se completen
  forkJoin([votaciones$, candidatos$]).subscribe(
    ([votaciones, candidatos]) => {
      console.log(votaciones);
      this.votaciones = votaciones;

      console.log(candidatos);
      const votacionSeleccionada = this.votaciones.find((votacion: any) => votacion.idVotacion === idVot);
      this.datosAguardar = { ...candidatos, ...votacionSeleccionada };
      
      this.loadVotaciones();
      this.router.navigate(['/Votacion']);
    },
    error => {
      console.error('Error al obtener datos', error);
    }
  );
}
loadVotaciones() {
  // Suponiendo que este método obtiene los datos del API
  console.log(this.datosAguardar);

  // Actualiza las votaciones en el servicio de compartición de datos
  this.compartirDatos.updateVotaciones(this.datosAguardar);
}
  public onLogoutClick(): void {
    this.authService.logout();
    window.location.href = "/";
  }
}
export interface type{
  id:number;
  text:string;
}