import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosProComponent } from './productos-pro.component';

describe('ProductosProComponent', () => {
  let component: ProductosProComponent;
  let fixture: ComponentFixture<ProductosProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosProComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
