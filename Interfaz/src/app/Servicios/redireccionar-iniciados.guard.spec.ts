import { TestBed } from '@angular/core/testing';

import { RedireccionarIniciadosGuard } from './redireccionar-iniciados.guard';

describe('RedireccionarIniciadosGuard', () => {
  let guard: RedireccionarIniciadosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedireccionarIniciadosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
