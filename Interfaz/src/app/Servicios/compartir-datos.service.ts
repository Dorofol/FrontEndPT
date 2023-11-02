import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompartirDatosService {
  private votacionesSource = new BehaviorSubject([]);
  votacionesActual = this.votacionesSource.asObservable();
  private ganadorSource = new BehaviorSubject<any>(null); 
  ganadorActual = this.ganadorSource.asObservable();
  constructor() { }

  updateVotaciones(votaciones: any) {
    this.votacionesSource.next(votaciones);
  }
  updateGanador(ganador: any) {
    this.ganadorSource.next(ganador);
}
}
