import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  private baseUrlcreate="http://localhost:8080/user/crearUsuario"
  private baseUrl="http://localhost:8080/user/login" 
  constructor(private httpclient:HttpClient) { }

  loginUser(user:User):Observable<object>{

    return this.httpclient.post(`${this.baseUrl}`,user);
  }  
  createUser(user:User):Observable<object>{

    return this.httpclient.post(`${this.baseUrlcreate}`,user);
  }
}
