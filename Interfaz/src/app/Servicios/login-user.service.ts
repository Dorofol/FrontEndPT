import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Modelos/user';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  private baseUrl="http://localhost:8080/user" 
  constructor(private httpclient:HttpClient) { }

  loginUser(user:User):Observable<object>{

    return this.httpclient.post(`${this.baseUrl}/loginCookie`,user);
  }  
  createUser(user:User):Observable<object>{

    return this.httpclient.post(`${this.baseUrl}/crearUsuario`,user);
  }
  actualizarUsuario(id: string, data: any): Observable<any> {
    return this.httpclient.put(`${this.baseUrl}/updateUsuario/${id}`, data);
  }
  getUsuarioPorId(id: any): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/getUsuario/${id}`);
  }
  getUsuarioPorEmail(id: any): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/getUsuarioEmail/${id}`);
  }
  borrarUsuarioPorEmail(email: any): Observable<void> {
    return this.httpclient.delete<void>(`${this.baseUrl}/borrarUsuario/${email}`);
  }
}
