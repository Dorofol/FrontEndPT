import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisOrganizacionesComponent } from './mis-organizaciones.component';

describe('MisOrganizacionesComponent', () => {
  let component: MisOrganizacionesComponent;
  let fixture: ComponentFixture<MisOrganizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisOrganizacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisOrganizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
