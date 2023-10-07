import { Component } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { LoginUserService } from '../../Servicios/login-user.service';

@Component({
  selector: 'app-ajustes-usuario',
  templateUrl: './ajustes-usuario.component.html',
  styleUrls: ['./ajustes-usuario.component.css']
})
export class AjustesUsuarioComponent {

  fechaNacimiento: string | null = null;
  nombreCompleto: string = '';
  contrasena: string = '';
  rolSistema: 'Admin' | 'Usuario' = 'Usuario';
  idBlockchain: string = '';
  email: string = '';
  authService: AutenticacionService;
  idUsuario: number | undefined;
  token:any;

  constructor(private _authService: AutenticacionService,private loginUser: LoginUserService) {
    this.authService = _authService;
    this.token= this.authService.getToken();
    this.obtenerMiUsuario();
   }

    public onLogoutClick(): void {
      this.authService.logout();
      window.location.href = "/";
    }
  actualizarUsuario(): void {
    console.log(this.fechaNacimiento+"T18:00:00.000");
    const datosActualizados = {
      fechaNacimiento: this.fechaNacimiento+"T18:00:00.000",
      nombreCompleto: this.nombreCompleto,
      contrasena: this.contrasena, 
      rolSistema: this.rolSistema,
      idBlockchain: this.idBlockchain,
      email: this.email,
      idUsuario: this.idUsuario
    };
    this.authService.validartok().subscribe(isValid => {
      if (isValid) {
        console.log(datosActualizados);
    if (this.idUsuario) {
      this.loginUser.actualizarUsuario(this.idUsuario.toString(), datosActualizados).subscribe(response => {
        console.log(response);
        alert('Usuario actualizado con éxito');
      }, error => {
        console.error('Error al actualizar usuario', error);
        alert('Ocurrió un error al actualizar el usuario');
      });
    } else {
      alert('ID de usuario no definido');
    }
      } else {
        alert("Token no valido.");
        this.authService.logout();
        window.location.href = "";
      }
    });
    
  }
  
  obtenerDatosUsuarioEmail(): void {

    if (this.email) {
      this.loginUser.getUsuarioPorEmail(this.email).subscribe(response => {
        
        this.idUsuario=response.id;
        console.log(response);
        this.obtenerDatosUsuario();
      },err=>{
        console.log(err);
        alert('Ocurrió un error al obtener los datos del usuario');})};

  }
  obtenerMiUsuario(): void {
    const userInfo = this.authService.getDecodedToken(this.token);
    this.idUsuario=userInfo.idUsuario
    this.obtenerDatosUsuario();
  }
  obtenerDatosUsuario(): void {
    if (this.idUsuario) {
        this.loginUser.getUsuarioPorId(this.idUsuario).subscribe(response => {
            console.log(response);
            // Convertir la cadena a un objeto real
            const data = this.parseUsuarioString(response.usuario);
            this.fechaNacimiento = data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString().split('T')[0] : null;
            this.nombreCompleto = data.nombreCompleto || '';
            this.rolSistema = data.rolSistema || 'Usuario';
            this.idBlockchain = data.idBlockchain || '';
            this.email = data.email || '';
        }, error => {
            console.error('Error al obtener los datos del usuario', error);
            alert('Ocurrió un error al obtener los datos del usuario');
        });
    } else {
        alert('ID de usuario no definido');
    }
}
eliminarUsuario(): void {
  let emailId=this.idUsuario;
  this.loginUser.borrarUsuarioPorEmail(emailId).subscribe(() => {
    alert('Usuario eliminado exitosamente');
  }, err => {
    console.error('Hubo un error al eliminar el usuario:', err);
  });
}

parseUsuarioString(usuarioStr: string): any {
    const pairs = usuarioStr.replace(/[\{\}]/g, '').split(', ');
    let usuario: any = {};
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        usuario[key] = value.replace(/'/g, ''); // eliminar comillas simples
    });
    return usuario;
}

  
  }
