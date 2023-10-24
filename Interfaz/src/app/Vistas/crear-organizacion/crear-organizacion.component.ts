import { Component } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { OrganizacionService } from 'src/app/Servicios/organizacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-organizacion',
  templateUrl: './crear-organizacion.component.html',
  styleUrls: ['./crear-organizacion.component.css']
})
export class CrearOrganizacionComponent {

  candidatoGan: number = 9999;
  nombreVotacion: string | undefined;
  descripcionVotacion: string| undefined;
  fechaInicioVotacion: string| undefined;
  fechaTerminoVotacion: string| undefined;
  contrasenaAdministrador: string| undefined;
  numCandidatos: number = 0;
  numVotantes: number = 0;
  estatus: boolean = true;
  authService: AutenticacionService;
  token: any;

  constructor(private router: Router ,private _authService: AutenticacionService,private organizacionService: OrganizacionService) { 
    this.authService = _authService;
  
    this.token= this.authService.getToken()   
  }

    public onLogoutClick(): void {
      this.authService.logout();
      window.location.href = "/";
    }
    
    crearOrganizacion() {
      
      this.authService.validartok().subscribe(isValid => {
        if (isValid) {
          
      const nuevaOrganizacion = {
        nombreOrganizacion: this.nombreVotacion,
        descripcion: this.descripcionVotacion,
        contrasenaAdministrador: this.contrasenaAdministrador,
      };

      const userInfo = this.authService.getDecodedToken(this.token);
      this.organizacionService.crearOrganizacion(nuevaOrganizacion,userInfo.idUsuario).subscribe(response => {
        console.log('Organización creada:', response);
        this.router.navigate(['/MisOrganizaciones']);
      });
      console.log(nuevaOrganizacion);
        } else {
          alert("Token no valido.");
          this.authService.logout();
          this.router.navigate(['']);
        }
      });
      
  }
}
