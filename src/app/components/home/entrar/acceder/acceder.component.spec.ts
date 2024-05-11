import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccederComponent } from './acceder.component';

describe('AccederComponent', () => {
  let component: AccederComponent;
  let fixture: ComponentFixture<AccederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccederComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
