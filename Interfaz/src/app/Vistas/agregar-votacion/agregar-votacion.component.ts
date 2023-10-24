import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { OrganizacionService } from 'src/app/Servicios/organizacion.service';
import { CompartirDatosService } from 'src/app/Servicios/compartir-datos.service';
import { Router } from '@angular/router';
import { VotacionesService } from 'src/app/Servicios/votaciones.service';
@Component({
  selector: 'app-agregar-votacion',
  templateUrl: './agregar-votacion.component.html',
  styleUrls: ['./agregar-votacion.component.css']
})
export class AgregarVotacionComponent implements OnInit {
    
  tituloVotacion: string| undefined;
  descripcion: string | undefined;
  fechaInicio: Date| undefined;
  fechaCierre: Date| undefined;
  idOrganizacion: number| undefined;
  estatus: string| undefined;  // Aquí debes llenar esta lista con las organizaciones disponibles


  authService: AutenticacionService;
  token: string | null;
  http: HttpClient;
  subscription: any;
  organizacion: any;
  constructor(private votacionesService:VotacionesService,    private router: Router ,private organizacionService: OrganizacionService,private _http: HttpClient,private _authService: AutenticacionService,private compartirDatos: CompartirDatosService) { 
    this.authService = _authService;
    this.token= this.authService.getToken();
    this.http=     _http;
    

    }
    ngOnInit(): void {
      this.subscription = this.compartirDatos.votacionesActual.subscribe(
        votaciones => (this.organizacion = votaciones));
        console.log(this.organizacion.idOrganizacion+"aaaaaaaaaaaaaaaaaaaaaaaaaaa")
  }
    agregarVotacion() {

      const votacionBlo={
        id: 12121,
        nombre: this.tituloVotacion,
        descripcion: this.descripcion,
        fecha_inicio: this.fechaInicio,
        fecha_final:this.fechaInicio,
        contrasena: "contrasenaSegura123"
        }

      console.log(votacionBlo)
      this.votacionesService.crearVotacionBlockchain(votacionBlo).subscribe(response => {
        console.log('Votación creada en la blockchain:', response.address);
        alert('Votación creada con éxito en la red blockchain!');
        const votacion = {
          tituloVotacion: this.tituloVotacion,
          descripcion: this.descripcion,
          fechaInicio: this.fechaInicio,
          fechaCierre: this.fechaCierre,
          idOrganizacion: this.organizacion.idOrganizacion,
          estatus: this.estatus,
          transaccionHash: response.address
      };
        this.votacionesService.crearVotacion(votacion).subscribe(response => {
          console.log('Votación creada:', response);
          alert('Votación creada con éxito!');
          
          this.router.navigate(['/MisOrganizaciones']);
          // Aquí puedes redirigir o hacer alguna otra acción
        });
        this.router.navigate(['/MisOrganizaciones']);
      },
      error => {
        console.error('Hubo un error al crear la votación:', error);
        alert('Ocurrió un error al crear la votación. Por favor, inténtalo de nuevo.');
      });

  }
    public onLogoutClick(): void {
      this.authService.logout();
      window.location.href = "/";
    }
}
