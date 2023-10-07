
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private httpclient:HttpClient) { }
  // ... (otros métodos y variables)
  userRole: 'Admin' | 'Usuario' | null = 'Admin'; 
  private TOKEN_KEY = 'auth_token';
  private USER_INFO_KEY = 'user_info';
  
  private baseUrl="http://localhost:8080/user/validateToken" 
  
  // Función para guardar el token en el Local Storage
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  
  // Función para obtener el token del Local Storage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  // Función para guardar la información del usuario en el Local Storage
  setUserInfo(userInfo: any): void {
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(userInfo));
  }
  
  // Función para obtener la información del usuario del Local Storage
  getUserInfo(userInfo: any): any {
    let informacion;
    try{
       informacion= JSON.stringify(userInfo)}catch(error){console.log(error);return null;}
    if (informacion) {
      return JSON.parse(informacion);
    }
    return null;
  }
  
  public isAdmin() {

    const tok=this.getToken()
    if(tok){
    const decodedToken = this.getDecodedToken(tok);
if (decodedToken && decodedToken.rolSistema) {
  this.userRole = decodedToken.rolSistema;
 // console.log(decodedToken.rolSistema)
}}
    return this.userRole === 'Admin';
  }
  public getDecodedToken(tokenString: string): any {
    //const token = localStorage.getItem('token');
    
    if (!tokenString) {
      return null;
    }
    return jwt_decode(tokenString);
  }
  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    console.log("success")
  }
  validartok(): Observable<boolean> {
    const tok1 = localStorage.getItem(this.TOKEN_KEY);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + tok1
      })
    };
  
    return new Observable<boolean>((observer) => {
      this.httpclient.post(`${this.baseUrl}`, {}, httpOptions).subscribe(
        (data: any) => {
          observer.next(true);
          observer.complete();
        },
        (err: any) => {
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
  
  
}

