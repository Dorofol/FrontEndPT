import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  private baseUrl = 'http://localhost:8080'; // Asume que tu backend se está ejecutando en el puerto 8080. Ajusta según sea necesario.

  constructor(private http: HttpClient) { }

  crearOrganizacion(organizacion: any, idUsuario: any): Observable<any> {
    const params = new HttpParams().set('idUsuario', idUsuario.toString());

    return this.http.post(`${this.baseUrl}/api/organizaciones/crearOrganizacion`, organizacion, { params });
  }
  obtenerPorIdUsuario(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/organizaciones/obtenerPorIdUsuario/${id}`);
  }
  obtenerEmailsPorOrganizacion(idOrganizacion: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/organizaciones/porOrganizacion/${idOrganizacion}`);
  }
  agregarUsuarioOrganizacion(idOrganizacion: number, idUsuario: number, rol: string) {
    const params = new HttpParams()
        .set('idOrganizacion', idOrganizacion.toString())
        .set('idUsuario', idUsuario.toString())
        .set('rol', rol);
        
    return this.http.post(`${this.baseUrl}/api/organizaciones/agregarUsuarioOrganizacion`, {}, { params: params });
}
eliminarUsuarioDeOrganizacion(idOrganizacion: number, idUsuario: number): Observable<any> {
  const params = new HttpParams()
      .set('idOrganizacion', idOrganizacion)
      .set('idUsuario', idUsuario);

  return this.http.delete(`${this.baseUrl}/api/organizaciones/eliminarUsuarioOrganizacion`, { params });
}

actualizarOrganizacion(id: number, organizacion: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/api/organizaciones/editarOrganizacion/${id}`, organizacion);
}


}
