import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompartirDatosService {
  private votacionesSource = new BehaviorSubject([]);
  votacionesActual = this.votacionesSource.asObservable();

  constructor() { }

  updateVotaciones(votaciones: any) {
    this.votacionesSource.next(votaciones);
  }
}
