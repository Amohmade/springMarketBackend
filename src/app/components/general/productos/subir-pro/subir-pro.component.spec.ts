import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirProComponent } from './subir-pro.component';

describe('SubirProComponent', () => {
  let component: SubirProComponent;
  let fixture: ComponentFixture<SubirProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirProComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubirProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
