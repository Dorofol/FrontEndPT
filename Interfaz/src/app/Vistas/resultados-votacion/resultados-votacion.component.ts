import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { OrganizacionService } from 'src/app/Servicios/organizacion.service';
import { CompartirDatosService } from 'src/app/Servicios/compartir-datos.service';
import { Router } from '@angular/router';
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
  constructor(
    private router: Router ,private organizacionService: OrganizacionService,private _http: HttpClient,private _authService: AutenticacionService,private compartirDatos: CompartirDatosService) { 
    this.authService = _authService;
    this.token= this.authService.getToken();
    this.http=     _http;
    for (let i = 0; i < 30; i++) {
      const randomDate = this.getRandomDate();
      const randomHash = this.getRandomHash();
      this.datos.push({ timestamp: randomDate, transaccionHash: randomHash });
    }

    }
    getRandomDate(): string {
      const start = new Date(2023, 9, 1); // 1 de octubre de 2023
      const end = new Date();
      const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return `${randomDate.getFullYear()}-${String(randomDate.getMonth() + 1).padStart(2, '0')}-${String(randomDate.getDate()).padStart(2, '0')} ${String(randomDate.getHours()).padStart(2, '0')}:${String(randomDate.getMinutes()).padStart(2, '0')}:${String(randomDate.getSeconds()).padStart(2, '0')}`;
    }
  
    // Función para generar un hash aleatorio
    getRandomHash(): string {
      let hash = '0x';
      for (let i = 0; i < 40; i++) {
        hash += Math.floor(Math.random() * 16).toString(16);
      }
      return hash;
    }
    public onLogoutClick(): void {
      this.authService.logout();
      window.location.href = "/";
    }
}
