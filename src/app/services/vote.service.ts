import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Voter } from '../model/dtos/voter';
import { NewVoter } from '../model/dtos/new-voter';
import { VoteRepositoryService } from './repository-services/vote-repository.service';
import { Store, select, State } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { sessionIdSelector } from '../state/app.selectors';
import { Vote } from '../model/dtos/vote';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private voteRepositoryService: VoteRepositoryService,
    private state: State<AppState>,
  ) { }

  /**
   * Registers a new voter with a post request, returns sessionId token
   * @param newVoter voter info used for setup
   */
  registerVoter(newVoter: NewVoter): Observable<string> {
    return this.voteRepositoryService.registerVoter(newVoter);
  }

  /**
   * Gets all voters from the voter repository
   */
  getAllVoters(): Observable<Voter[]> {
    return this.voteRepositoryService.getAllVoters();
  }

  /**
   * Casts a vote using the current session ID from the state
   * @param vote Vote from the vote card clicked
   */
  castVote(vote: Vote): Observable<HttpResponse<any>> {
    const sessionId = sessionIdSelector(this.state.value);
    return this.voteRepositoryService.castVote(sessionId, vote);
  }

}
