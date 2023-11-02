import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
updateVotacionEstatus(idVotacion: number, idOrganizacion: number, estatusString: string): Observable<any> {
  const url = `${this.baseUrl}/api/votaciones/estatus/${idVotacion}/${idOrganizacion}`;
  return this.http.put(url, estatusString, { responseType: 'text' });
}


votar(candidato_ID: number, votante_id: number, votacion_ID: number, direccionHash: string): Observable<any> {
  let params = new HttpParams();
  params = params.append('candidato_ID', candidato_ID.toString());
  params = params.append('votante_id', votante_id.toString());
  params = params.append('votacion_ID', votacion_ID.toString());
  params = params.append('direccionHash', direccionHash);

  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  return this.http.post(`${this.baseUrl}/api/votaciones/votar`, params.toString(), { headers: headers });
}

obtenerIdGanador(direccionHash: string): Observable<any> {
  const url = `http://localhost:8080/api/votaciones/obtenerGanador?direccionHash=${direccionHash}`;
  return this.http.get<any>(url);
}

obtenerVotosPorIdVotaciones(idVotaciones: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/api/votaciones/porIdVotaciones/${idVotaciones}`);
}

}
