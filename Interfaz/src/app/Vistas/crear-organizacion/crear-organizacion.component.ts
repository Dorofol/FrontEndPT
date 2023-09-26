import { Component } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';


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

  constructor(private _authService: AutenticacionService) { 
    this.authService = _authService;}

    public onLogoutClick(): void {
      this.authService.logout();
      window.location.href = "/";
    }
    crearOrganizacion() {
      const nuevaOrganizacion = {
          candidatoGan: this.candidatoGan,
          nombreVotacion: this.nombreVotacion,
          descripcionVotacion: this.descripcionVotacion,
          fechaInicioVotacion: this.fechaInicioVotacion,
          fechaTerminoVotacion: this.fechaTerminoVotacion,
          contrasenaAdministrador: this.contrasenaAdministrador,
          numCandidatos: this.numCandidatos,
          numVotantes: this.numVotantes,
          estatus: this.estatus
      };

      console.log(nuevaOrganizacion);
      // Aquí podrías enviar los datos al backend o a tu contrato en la blockchain.
  }
}
