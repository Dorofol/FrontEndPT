import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraccionVotacionComponent } from './interaccion-votacion.component';

describe('InteraccionVotacionComponent', () => {
  let component: InteraccionVotacionComponent;
  let fixture: ComponentFixture<InteraccionVotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteraccionVotacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteraccionVotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
