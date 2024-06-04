import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoscanbarrasComponent } from './infoscanbarras.component';

describe('InfoscanbarrasComponent', () => {
  let component: InfoscanbarrasComponent;
  let fixture: ComponentFixture<InfoscanbarrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoscanbarrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoscanbarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
