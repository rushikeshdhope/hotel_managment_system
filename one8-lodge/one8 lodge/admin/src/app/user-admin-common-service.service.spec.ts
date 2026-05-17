import { TestBed } from '@angular/core/testing';

import { UserAdminCommonServiceService } from './user-admin-common-service.service';

describe('UserAdminCommonServiceService', () => {
  let service: UserAdminCommonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdminCommonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
