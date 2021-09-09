import { TestBed } from '@angular/core/testing';

import { FormateurServiceService } from './formateur-service.service';

describe('FormateurServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormateurServiceService = TestBed.get(FormateurServiceService);
    expect(service).toBeTruthy();
  });
});
