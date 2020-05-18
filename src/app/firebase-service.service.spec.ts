import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase-service.service';

describe('FirebaseServiceService', () => {
  let service: FirebaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
