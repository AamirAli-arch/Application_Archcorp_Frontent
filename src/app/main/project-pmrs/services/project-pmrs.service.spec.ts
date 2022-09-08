import { TestBed } from '@angular/core/testing';

import { ProjectPmrsService } from './project-pmrs.service';

describe('ProjectPmrsService', () => {
  let service: ProjectPmrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectPmrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
