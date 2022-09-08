import { TestBed } from '@angular/core/testing';

import { LoaderSpinerService } from './loader-spiner.service';

describe('LoaderSpinerService', () => {
  let service: LoaderSpinerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderSpinerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
