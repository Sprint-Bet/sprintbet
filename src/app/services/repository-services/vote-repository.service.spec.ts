import { TestBed } from '@angular/core/testing';

import { VoteRepositoryService } from './vote-repository.service';

describe('VoteRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoteRepositoryService = TestBed.get(VoteRepositoryService);
    expect(service).toBeTruthy();
  });
});
