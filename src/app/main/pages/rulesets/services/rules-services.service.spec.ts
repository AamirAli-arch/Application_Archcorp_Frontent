import { TestBed } from '@angular/core/testing';

import { RulesServicesService } from './rules-services.service';


describe('RulesServicesService', () => {
  let service: RulesServicesService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
