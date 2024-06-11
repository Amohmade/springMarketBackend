import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosproductosComponent } from './todosproductos.component';

describe('TodosproductosComponent', () => {
  let component: TodosproductosComponent;
  let fixture: ComponentFixture<TodosproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosproductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
