import { TestBed } from '@angular/core/testing';

import { JobApplicationService } from './job-application.service';

describe('JobApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobApplicationService = TestBed.get(JobApplicationService);
    expect(service).toBeTruthy();
  });
});
