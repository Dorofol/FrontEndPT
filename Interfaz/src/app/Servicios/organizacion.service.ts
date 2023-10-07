import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  private baseUrl = 'http://localhost:8080'; // Asume que tu backend se está ejecutando en el puerto 8080. Ajusta según sea necesario.

  constructor(private http: HttpClient) { }

  crearOrganizacion(organizacion: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/organizaciones/crearOrganizacion`, organizacion);
  }
}
