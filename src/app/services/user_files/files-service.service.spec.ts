import { TestBed } from '@angular/core/testing';

import { UserFilesServiceService } from './files-service.service';

describe('UserFilesServiceService', () => {
  let service: UserFilesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFilesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
