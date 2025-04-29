import { TestBed } from '@angular/core/testing';

import { PatientsProfileService } from './patients-profile.service';

describe('PatientsProfileService', () => {
  let service: PatientsProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
