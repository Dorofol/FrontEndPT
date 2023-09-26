import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterModule,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../Servicios/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class RedireccionarIniciadosGuard implements CanActivate {
  constructor(private authService: AutenticacionService, private router: RouterModule) { }  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.authService.getToken();

      if (token) {
        window.location.href = "/inicioSesion";
        return false;
      }
      return true;
  }
}
