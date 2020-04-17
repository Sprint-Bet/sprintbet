import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Voter } from '../model/dtos/voter';
import { NewVoter } from '../model/dtos/new-voter';
import { VoteRepositoryService } from './repository-services/vote-repository.service';
import { Store, select } from '@ngrx/store';
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
    private store: Store<AppState>,
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
    return this.store.pipe(
      select(sessionIdSelector),
      switchMap(sessionId => this.voteRepositoryService.castVote(sessionId, vote)),
    );
  }

  /**
   * Leave the current game / room
   * @param sessionId id of the voter to remove from room
   */
  leaveRoom(sessionId: string): Observable<HttpResponse<any>> {
    return this.voteRepositoryService.leaveRoom(sessionId);
  }

  /**
   * Dealer locks voting
   */
  lockVoting(): Observable<HttpResponse<any>> {
    return this.voteRepositoryService.lockVoting();
  }

}
