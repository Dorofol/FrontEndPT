import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { OrganizacionService } from 'src/app/Servicios/organizacion.service';
import { CompartirDatosService } from 'src/app/Servicios/compartir-datos.service';
import { Router } from '@angular/router';
import { VotacionesService } from 'src/app/Servicios/votaciones.service';
@Component({
  selector: 'app-votacion',
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.css']
})
export class VotacionComponent implements OnInit {
  authService: AutenticacionService;
  token: string | null;
  subscription: any;
  votaciones: any;
  candidatos: any[] = [];
  votacion: any = {};
  constructor(private votacionesService:VotacionesService,private router: Router ,private organizacionService: OrganizacionService,private _http: HttpClient,private _authService: AutenticacionService,private compartirDatos: CompartirDatosService) { 
    this.authService = _authService;
    this.token= this.authService.getToken() 
    this.subscription = this.compartirDatos.votacionesActual.subscribe(
      votaciones => (this.votaciones = votaciones));
    
    }
    ngOnInit() {
      this.loadData();
    }
  
    loadData() {
      let data = this.votaciones 
  
      for (let key in data) {
        if (data[key].idCandidato) {
          this.candidatos.push(data[key]);
        }
      }
  
      this.votacion = {
        idVotacion: data.idVotacion,
        tituloVotacion: data.tituloVotacion,
        descripcion: data.descripcion,
        fechaInicio: data.fechaInicio,
        fechaCierre: data.fechaCierre,
        idOrganizacion: data.idOrganizacion,
        estatus: data.estatus,
        transaccionHash: data.transaccionHash
      };
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    public onLogoutClick(): void {
      this.authService.logout();
      window.location.href = "/";
    }
    enviarCandidato(nombre: string, descripcion: string) {
      let data = this.votaciones 
      const candidatoDataBlock = {
          id_candidato: 110, // Ejemplo de generación de un ID aleatorio. Ajusta según tus necesidades.
          nombre_candidato: nombre,
          email_candidato: descripcion, // Añade los campos adicionales según necesites.
          contrasena: "contrasenaSegura123", // Y también la contraseña
          direccionHash : data.transaccionHash,
      };
      console.log("aaaaaaaaaaaaaaaa")
      console.log(candidatoDataBlock)

      this.votacionesService.agregarCandidatoBlock(candidatoDataBlock).subscribe(
          response => {
              console.log('Respuesta del servidor:', response);
              alert('Candidato agregado a la blockchain con éxito!');
              const candidatoData = {
                nombreCandidato: nombre,
                descripcionPerfil: descripcion,
                idVotacion: data.idVotacion, // Suponiendo que 'data' tiene un campo 'id' con el id de la votación.
                transaccionHash: response.transaccionHash,
            };
            console.log("bbbbbbbbbbbbbbbbbbbbbbb")
            console.log(candidatoData)
              this.votacionesService.agregarCandidato(candidatoData).subscribe(
                response => {
                    console.log('Respuesta del servidor:', response);
                    alert('Candidato agregado con éxito!');
                },
                error => {
                    console.error('Hubo un error al agregar el candidato:', error);
                    alert('Error al agregar el candidato. Intenta de nuevo.'+error);
                }
            );

          },
          error => {
              console.error('Hubo un error al agregar el candidato:', error);
              alert('Error al agregar el candidato. Intenta de nuevo.'+error);
          }
      );
  }
  votar(idCandidato: number) {
    // Aquí puedes realizar la lógica para agregar el voto a la base de datos y a la red blockchain.
    // Como esto es solo un ejemplo, mostraremos el mensaje directamente.

    // Hash genérico de ejemplo
    let hashEjemplo = "0xabcdef1234567890abcdef1234567890abcdef12";

    alert(`El voto para el candidato con ID ${idCandidato} se agregó correctamente a la base de datos y a la red blockchain. Transaction Hash: ${hashEjemplo}`);
  }
}
