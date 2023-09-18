import { Component, OnInit } from '@angular/core';
import { LoginUserService } from '../../Servicios/login-user.service';
import { User } from '../../Modelos/user';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  user:User = new User()

  constructor(private loginUser: LoginUserService) { }

  ngOnInit(): void {
  }
  imprimirUsuario(){

    console.log(this.user)
    this.loginUser.loginUser(this.user).subscribe(data=>{alert("Se ha iniciado sesion."); window.location.href = "/inicio/sesion";},error=>alert("Usuario o contraseña incorrectos."))
  }

}
