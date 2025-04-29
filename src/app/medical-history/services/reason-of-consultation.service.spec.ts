import { TestBed } from '@angular/core/testing';

import { ReasonOfConsultationService } from './reason-of-consultation.service';

describe('ReasonOfConsultationService', () => {
  let service: ReasonOfConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReasonOfConsultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
