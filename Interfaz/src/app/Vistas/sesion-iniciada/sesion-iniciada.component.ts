import { Component, OnInit } from '@angular/core';
import { User } from '../../Modelos/user';
import { AutenticacionService } from '../../Servicios/autenticacion.service';

@Component({
  selector: 'app-sesion-iniciada',
  templateUrl: './sesion-iniciada.component.html',
  styleUrls: ['./sesion-iniciada.component.css']
})
export class SesionIniciadaComponent implements OnInit {
  
  user:User= new User()
  authService: AutenticacionService;
  userinformacion: any;
  nombreCompleto: string = '';
  email: string = '';
  rolSistema: string = '';
  
  token: any;
  

  public DataSource:type[] = [
    {id: 1, text: 'Sentence 1'},
    {id: 2, text: 'Sentence 2'},
    {id: 3, text: 'Sentence 3'},
    {id: 4, text: 'Sentenc4 '},
];
  
constructor(private _authService: AutenticacionService) {
  this.authService = _authService;   
  this.token= this.authService.getToken()   
}

ngOnInit(): void {
  if (this.token) {
      const userInfo = this.authService.getDecodedToken(this.token);
      console.log(userInfo);
      this.userinformacion=userInfo;
      if(userInfo) {
        this.nombreCompleto = userInfo.nombreCompleto || '';
        this.email = userInfo.email || '';
        this.rolSistema = userInfo.rolSistema || '';
      }
  } else {
      console.log("No hay token disponible");
  }
}

  public onLogoutClick(): void {
    this.authService.logout();
    window.location.href = "/";
  }
}
export interface type{
  id:number;
  text:string;
}