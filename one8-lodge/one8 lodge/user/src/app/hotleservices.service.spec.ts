import { TestBed } from '@angular/core/testing';

import { HotleservicesService } from './hotleservices.service';

describe('HotleservicesService', () => {
  let service: HotleservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotleservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
