import { Component } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';

@Component({
  selector: 'app-ajustes-usuario',
  templateUrl: './ajustes-usuario.component.html',
  styleUrls: ['./ajustes-usuario.component.css']
})
export class AjustesUsuarioComponent {

  // Definición de las propiedades para enlazarlas con ngModel
  fechaNacimiento: Date | null = null;
  nombreCompleto: string = '';
  contrasena: string = '';
  rolSistema: 'Admin' | 'Usuario' = 'Usuario';
  idBlockchain: string = '';
  email: string = '';
  authService: AutenticacionService;
  idUsuario: number | undefined;

  constructor(private _authService: AutenticacionService) {
    this.authService = _authService;}

    public onLogoutClick(): void {
      this.authService.logout();
      window.location.href = "/";
    }
  // Método que se llamará cuando se envíe el formulario
  actualizarUsuario(): void {
    // Aquí debes manejar la lógica para actualizar la información del usuario, 
    // como enviar los datos a tu API o servicio que se encargue de ello.

    const datosActualizados = {
      fechaNacimiento: this.fechaNacimiento,
      nombreCompleto: this.nombreCompleto,
      contrasena: this.contrasena, // ¡Cuidado! No envíes contraseñas en texto claro.
      rolSistema: this.rolSistema,
      idBlockchain: this.idBlockchain,
      email: this.email,
      idUsuario: this.idUsuario
    };

    console.log(datosActualizados);

    // Ejemplo: si tuvieras un servicio para actualizar datos del usuario:
    // this.usuarioService.actualizarUsuario(datosActualizados).subscribe(response => {
    //   console.log(response);
    //   alert('Usuario actualizado con éxito');
    // });
  }
}
