import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  // ... (otros métodos y variables)
  userRole: 'admin' | 'user' | null = 'admin'; 
  private TOKEN_KEY = 'auth_token';
  private USER_INFO_KEY = 'user_info';
  
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
  getUserInfo(): any {
    const userInfo = localStorage.getItem(this.USER_INFO_KEY);
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  }
  
  public isAdmin() {
    return this.userRole === 'admin';
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
  constructor() { }
}

