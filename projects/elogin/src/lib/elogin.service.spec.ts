import { TestBed } from '@angular/core/testing';

import { EloginService } from './elogin.service';

describe('EloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EloginService = TestBed.get(EloginService);
    expect(service).toBeTruthy();
  });
});
