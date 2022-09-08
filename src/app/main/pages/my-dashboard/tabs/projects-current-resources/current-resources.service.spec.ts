import { TestBed } from '@angular/core/testing';

import { CurrentResourcesService } from './current-resources.service';

describe('CurrentResourcesService', () => {
  let service: CurrentResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
