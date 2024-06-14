import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarportodosComponent } from './comprarportodos.component';

describe('ComprarportodosComponent', () => {
  let component: ComprarportodosComponent;
  let fixture: ComponentFixture<ComprarportodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprarportodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComprarportodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
