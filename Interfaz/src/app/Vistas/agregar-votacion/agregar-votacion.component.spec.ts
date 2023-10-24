import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVotacionComponent } from './agregar-votacion.component';

describe('AgregarVotacionComponent', () => {
  let component: AgregarVotacionComponent;
  let fixture: ComponentFixture<AgregarVotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarVotacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarVotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
