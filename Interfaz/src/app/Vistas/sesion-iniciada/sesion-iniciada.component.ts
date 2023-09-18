import { Component, OnInit } from '@angular/core';
import { User } from '../../Modelos/user';

import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-sesion-iniciada',
  templateUrl: './sesion-iniciada.component.html',
  styleUrls: ['./sesion-iniciada.component.css']
})
export class SesionIniciadaComponent implements OnInit {
  
  user:User= new User()
  public DataSource:type[] = [
    {id: 1, text: 'Sentence 1'},
    {id: 2, text: 'Sentence 2'},
    {id: 3, text: 'Sentence 3'},
    {id: 4, text: 'Sentenc4 '},
];
  constructor() { }

  ngOnInit(): void {
  }

  imprimirUsuario(){

    console.log(this.user)
  }

}
export interface type{
  id:number;
  text:string;
}