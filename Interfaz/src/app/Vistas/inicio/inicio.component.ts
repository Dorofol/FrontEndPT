import { Component, OnInit } from '@angular/core';
import { LoginUserService } from '../../Servicios/login-user.service';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { User } from '../../Modelos/user';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  user:User = new User()

  constructor(private loginUser: LoginUserService, private autenticacionService: AutenticacionService ) { }

  ngOnInit(): void {
  }
  imprimirUsuario() {
    console.log(this.user);
    this.loginUser.loginUser(this.user).subscribe((data: any) => {
      console.log(data.token);
      this.autenticacionService.setToken(data.token);
      
      const userInfo = this.autenticacionService.getDecodedToken(data.token);
      console.log(userInfo);
      this.autenticacionService.setUserInfo(userInfo);
  
      alert("Se ha iniciado sesion.");
      window.location.href = "/inicioSesion";
    },
      error => {
        console.log(error);
        alert("Usuario o contraseña incorrectos.");
      });
  }
  

}
