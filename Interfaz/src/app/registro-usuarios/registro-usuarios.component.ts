import { Component, OnInit } from '@angular/core';
import { LoginUserService } from '../login-user.service';
import { User } from '../user';
import { FormGroup ,FormBuilder, Validators } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
 user:User = new User()
 
 public formulario!: FormGroup;
  constructor(private loginUser: LoginUserService, private _fb: FormBuilder) {
    
   }
  

  ngOnInit(): void {
    console.log('Componente formulario cargado');
    this.initForms();
  }
  initForms() {
    this.formulario = this._fb.group({
      input1: [, Validators.required],
      input2: [, Validators.required],
      input3: [, Validators.required],
      input4: [, Validators.required],
      input5: [, Validators.required]
    });
  }
  crearModificarUsuario(){
    console.log("chiquitiu",this.user)
    if (this.formulario.value.input1 === '' || this.formulario.value.input2 === null || this.formulario.value.input3 === null|| this.formulario.value.input4 === ''|| this.formulario.value.input5 === null){
      alert(" El usuario No se pudo crear revise los campos.!!!!")
    }
    else{

    console.log(this.user)
    this.loginUser.createUser(this.user).subscribe(data=>{alert("Se creo su usuario.");window.location.href = "/inicio/sesion";},error=>alert(" El usuario No se pudo crear revise los campos."))
    }
  }
}
