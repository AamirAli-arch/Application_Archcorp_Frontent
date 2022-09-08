import { TestBed } from '@angular/core/testing';

import { ProjectWiseService } from './project-wise.service';

describe('ProjectWiseService', () => {
  let service: ProjectWiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectWiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
