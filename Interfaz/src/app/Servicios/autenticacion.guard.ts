import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../Servicios/autenticacion.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {  
  
  private baseUrl="http://localhost:8080/user/validateToken" 
  constructor(private authService: AutenticacionService, private router: RouterModule,private httpclient:HttpClient) { }  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.authService.getToken();

      if (token) {
        var valtoken=false;
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token
            })
        };
    
        this.httpclient.post(`${this.baseUrl}`, {}, httpOptions).subscribe((data: any) => {
            console.log(data);
            valtoken= true;
        },
        error => {
            alert("Token no valido.");
            this.authService.logout();
            window.location.href = "";
            valtoken= false;

        });
    return true;
    }
      window.location.href = "";// redirige al login si no hay token
      return false;
  }

}

