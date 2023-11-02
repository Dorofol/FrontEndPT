import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { OrganizacionService } from 'src/app/Servicios/organizacion.service';
import { CompartirDatosService } from 'src/app/Servicios/compartir-datos.service';
import { Router } from '@angular/router';
import { VotacionesService } from 'src/app/Servicios/votaciones.service';
@Component({
  selector: 'app-resultados-votacion',
  templateUrl: './resultados-votacion.component.html',
  styleUrls: ['./resultados-votacion.component.css']
})
export class ResultadosVotacionComponent {
  datos: any[] = [];
  authService: AutenticacionService;
  token: string | null;
  http: HttpClient;
  candidatoGanador: any;
  constructor(private votacionesService:VotacionesService,private router: Router ,private organizacionService: OrganizacionService,private _http: HttpClient,private _authService: AutenticacionService,private compartirDatos: CompartirDatosService) { 
    this.authService = _authService;
    this.token= this.authService.getToken();
    this.http=     _http;

    }
    ngOnInit() {
      // Suscribirse al observable del candidato ganador
      this.compartirDatos.ganadorActual.subscribe(data => {
        this.candidatoGanador = data;
      });
      this.cargarDatos();
    }

  cargarDatos(): void {
      this.votacionesService.obtenerVotosPorIdVotaciones(Number (this.candidatoGanador.idVotacion)).subscribe(response => { 
          this.datos = response;
      });
  }
  public onLogoutClick(): void {
    this.authService.logout();
    window.location.href = "/";
  }
}
