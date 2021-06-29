import { TestBed } from '@angular/core/testing';

import { UserTransferService } from './user-transfer.service';

describe('UserTransferService', () => {
  let service: UserTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
