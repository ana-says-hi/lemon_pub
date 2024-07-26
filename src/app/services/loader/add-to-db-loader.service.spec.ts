import { TestBed } from '@angular/core/testing';

import { AddToDbLoaderService } from './add-to-db-loader.service';

describe('AddToDbLoaderService', () => {
  let service: AddToDbLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToDbLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
