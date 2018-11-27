import { TestBed } from '@angular/core/testing';

import { SloginService } from './slogin.service';

describe('SloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SloginService = TestBed.get(SloginService);
    expect(service).toBeTruthy();
  });
});
