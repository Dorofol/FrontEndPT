import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { OrganizacionService } from 'src/app/Servicios/organizacion.service';
import { CompartirDatosService } from 'src/app/Servicios/compartir-datos.service';
import { Router } from '@angular/router';
import { VotacionesService } from 'src/app/Servicios/votaciones.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-votacion',
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.css']
})
export class VotacionComponent implements OnInit {
  authService: AutenticacionService;
  token: any;
  subscription: any;
  votaciones: any;
  candidatos: any[] = [];
  votacion: any = {};
  iduserblo: any;
  posicion:any;
  
  nombreCompleto: string = '';
  email: string = '';
  rolSistema: string = '';

 
  private candidatoGanadorSource = new BehaviorSubject(null);
  candidatoGanadorActual = this.candidatoGanadorSource.asObservable();
  
  userinformacion: any;
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
      console.log(this.email+"aaaaaaaaaaaaaaaaaaaa" )
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
      
      this.organizacionService.obtenerEmailsPorOrganizacion(data.idOrganizacion).subscribe(data => {
        this.iduserblo = data;
      
        const emailBuscado = this.email; // Reemplaza esto con el email actual que deseas buscar
        const posicion1 = this.iduserblo.findIndex((usuario: any) => usuario.email === emailBuscado);
      
        if (posicion1 !== -1) {
          console.log(`El usuario con el email ${emailBuscado} está en la posición ${posicion1 + 1}`);
          this.posicion=posicion1+1;
        } else {
          console.log(`No se encontró el usuario con el email ${emailBuscado}`);
        }
      });
      
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    public onLogoutClick(): void {
      this.authService.logout();
      window.location.href = "/";
    }

    realizarVotacion(fila: number) {
      console.log("Fila seleccionada:", fila); // Esto imprimirá el número de fila seleccionada
      
      let data = this.votaciones;
      const votanteID = this.posicion;
      const votacionID = data.idVotacion;
      const direccionHash = data.transaccionHash;
    
      this.votacionesService.votar(fila, votanteID, votacionID, direccionHash)
        .subscribe(response => {
          console.log('Votación realizada', response);
          
          alert(`El voto para el candidato con ID ${fila} se agregó correctamente a la base de datos y a la red blockchain.${response}`);
        }, error => {
          console.error('Error al realizar la votación', error);
          alert(`No se pudo agregar el voto paso algun error`);
        });
        
    }
    verResultados() {
      let data = this.votaciones;
      this.votacionesService.obtenerIdGanador(data.transaccionHash).subscribe(response => {
          const indiceGanador = Number(response.id_candidatoGanador) - 1;
      
          const candidatoGanador = this.candidatos[indiceGanador];
      
          if (candidatoGanador) {
              console.log('Datos del candidato ganador:', candidatoGanador);
              
              // Agregar el idVotacion al objeto del candidato ganador
              candidatoGanador.idVotacion = data.idVotacion;
  
              // Actualizar el candidato ganador en el servicio
              this.compartirDatos.updateGanador(candidatoGanador);
              
              this.router.navigate(['/resultadosVot']);
          } else {
              console.log('Índice del candidato ganador no válido:', indiceGanador);
          }
      });
  }
    updateCandidatoGanador(candidato: any) {
      this.candidatoGanadorSource.next(candidato);
    }


    statusVotacion(): void {
      const newStatus = this.votaciones.estatus === 'Activa' ? 'Finalizada' : 'Activa';
      
      this.votacionesService.updateVotacionEstatus(this.votaciones.idVotacion, this.votaciones.idOrganizacion, newStatus).subscribe(response => {
        console.log(response);
        this.votaciones.estatus = newStatus; // Actualiza el estatus localmente tras el cambio exitoso
      }, error => {
        console.error("Error al actualizar el estatus:", error);
      });
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

}
