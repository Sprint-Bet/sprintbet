import { TestBed } from '@angular/core/testing';

import { VoteHubService } from './vote-hub.service';

describe('VoteHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoteHubService = TestBed.get(VoteHubService);
    expect(service).toBeTruthy();
  });
});
