import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarProComponent } from './borrar-pro.component';

describe('BorrarProComponent', () => {
  let component: BorrarProComponent;
  let fixture: ComponentFixture<BorrarProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarProComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrarProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
