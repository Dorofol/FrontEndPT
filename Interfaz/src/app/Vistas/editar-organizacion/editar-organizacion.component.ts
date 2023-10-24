import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { OrganizacionService } from 'src/app/Servicios/organizacion.service';
import { CompartirDatosService } from 'src/app/Servicios/compartir-datos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editar-organizacion',
  templateUrl: './editar-organizacion.component.html',
  styleUrls: ['./editar-organizacion.component.css']
})
export class EditarOrganizacionComponent {
  authService: AutenticacionService;
  token: string | null;
  subscription: any;
  organizacion: any; 
  nombreOrganizacion: string | undefined;
  descripcion: string | undefined;
  contrasenaAdministrador: string | undefined; // Asumiendo que quieres mantener esto en el formulario
  usuarios: any[] = [];
  emailUsuario: any;
  http: any;
  emails: any [] = [];
  displayedEmails: any[] = [];
  currentPage: number = 0;
pageSize: number = 5;
maxPages: number;
rolSeleccionado: string = "Usuario"; // valor predeterminado

  
  public onLogoutClick(): void {
    this.authService.logout();
    window.location.href = "/";
  }
  ngOnInit(): void {
    this.subscription = this.compartirDatos.votacionesActual.subscribe(
      votaciones => (this.organizacion = votaciones));
      console.log(this.organizacion)
      const data=this.organizacion;
      
    this.nombreOrganizacion = data.nombreOrganizacion;
    this.descripcion = data.descripcion;
    const idOrganizacion = data.idOrganizacion; 
    this.organizacionService.obtenerEmailsPorOrganizacion(idOrganizacion).subscribe(data => {
      this.emails = data;
      console.log(this.emails)
      this.updateDisplayedEmails();
    });
}
private updateDisplayedEmails(): void {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.displayedEmails = this.emails.slice(startIndex, endIndex);
  this.maxPages = Math.ceil(this.emails.length / this.pageSize) - 1;
}

// Agrega estos métodos para controlar la paginación
nextPage(): void {
  if (this.currentPage < this.maxPages) {
    this.currentPage++;
    this.updateDisplayedEmails();
  }
}

previousPage(): void {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.updateDisplayedEmails();
  }
}

actualizarOrg(): void {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.updateDisplayedEmails();
  }
}

  constructor(
    private router: Router ,private organizacionService: OrganizacionService,private _http: HttpClient,private _authService: AutenticacionService,private compartirDatos: CompartirDatosService) { 
    this.authService = _authService;
    this.token= this.authService.getToken();
    this.http=     _http;
    this.maxPages = 0;

    }
    
    agregarUsuario() {
      console.log("a")
      if (!this.emailUsuario) {
        console.log("b")
        window.alert('Agrege un email valido al campo de agregar email.');
        
    this.updateDisplayedEmails();
          return;
      }
  
      if (this.emails.some(user => user.email=== this.emailUsuario)) {
        console.log("c")
        window.alert('El email ya existe en la tabla.');
        
    this.updateDisplayedEmails();
    
          return;
      }
      this.http.get(`http://localhost:8080/user/getUsuarioEmail/${this.emailUsuario}`).subscribe(
        (response: any) => {
          console.log(response.id)
            const newUser = {
                email: this.emailUsuario,
                rol: this.rolSeleccionado
            };
            this.organizacionService.agregarUsuarioOrganizacion(this.organizacion.idOrganizacion, response.id, this.rolSeleccionado).subscribe(data => {
              console.log(data);
              
            this.emails.push(newUser);
            this.emailUsuario = '';
            this.updateDisplayedEmails();
            window.alert('Se creo el usuario con exito en la base de datos.');
          },(error: any) => {
            window.alert('No se pudo crear el usuario en la base de datos.');

          });
          
        },
        (error: any) => {
            window.alert('No existe el usuario o esta mal escrito.');
            console.error('El email no se encontró', error);
            // Mostrar algún mensaje de que el email no es válido o no existe
        }
    );
    
    this.updateDisplayedEmails();
}
  

eliminarUsuario(usuario: any) {
  this.http.get(`http://localhost:8080/user/getUsuarioEmail/${usuario}`).subscribe(
        (response: any) => {
          console.log("aaaaaaaaaaaa"+this.organizacion.idOrganizacion+ response.id)
  this.organizacionService.eliminarUsuarioDeOrganizacion(this.organizacion.idOrganizacion, response.id).subscribe(
      response => {
          console.log(response.message);
          window.alert('Se elimino el usuario correctamente de la base de datos.');
          const index = this.emails.findIndex(user => user.email === usuario);
          if (index > -1) {
              this.emails.splice(index, 1);
          }
          this.updateDisplayedEmails();
      },
      error => {
          console.error("Error al eliminar el usuario:", error);
          window.alert('Ocurrió un error al eliminar el usuario. Intente nuevamente.');
      }
  );});
}
}
