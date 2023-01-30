import { TestBed } from '@angular/core/testing';

import { HandleFileService } from './handle-file.service';

describe('HandleFileService', () => {
  let service: HandleFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
