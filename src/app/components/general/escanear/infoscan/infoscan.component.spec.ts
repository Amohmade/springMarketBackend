import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoscanComponent } from './infoscan.component';

describe('InfoscanComponent', () => {
  let component: InfoscanComponent;
  let fixture: ComponentFixture<InfoscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoscanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
