import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOrganizacionComponent } from './editar-organizacion.component';

describe('EditarOrganizacionComponent', () => {
  let component: EditarOrganizacionComponent;
  let fixture: ComponentFixture<EditarOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarOrganizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
