import { TestBed } from '@angular/core/testing';

import { ServiciorolService } from './serviciorol.service';

describe('ServiciorolService', () => {
  let service: ServiciorolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciorolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
