import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProComponent } from './editar-pro.component';

describe('EditarProComponent', () => {
  let component: EditarProComponent;
  let fixture: ComponentFixture<EditarProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
