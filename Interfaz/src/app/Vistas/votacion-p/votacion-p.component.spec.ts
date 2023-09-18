import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacionPComponent } from './votacion-p.component';

describe('VotacionPComponent', () => {
  let component: VotacionPComponent;
  let fixture: ComponentFixture<VotacionPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotacionPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotacionPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
