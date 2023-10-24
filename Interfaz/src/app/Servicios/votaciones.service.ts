import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotacionesService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  crearVotacion(votacion: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/votaciones/agregar`, votacion); 
  }
  crearVotacionBlockchain(votacion: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/proxy/proxyPost/desplegarContrato`, votacion);
  }

  agregarCandidatoBlock(candidato: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/proxy/proxyPost/agregarCandidato`, candidato);
  }
  agregarCandidato(candidato: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/votaciones/agregarCandidato`, candidato);
}
}
