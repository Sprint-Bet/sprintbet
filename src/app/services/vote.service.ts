import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Voter } from '../model/dtos/voter';
import { NewVoter } from '../model/dtos/new-voter';
import { VoteRepositoryService } from './repository-services/vote-repository.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { sessionIdSelector, roomSelector } from '../state/app.selectors';
import { Vote } from '../model/dtos/vote';
import { HttpResponse } from '@angular/common/http';
import { Room } from '../model/dtos/room';
import { VoteHubService } from './hub-services/vote-hub.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private voteRepositoryService: VoteRepositoryService,
    private store: Store<AppState>,
    private voteHubService: VoteHubService,
  ) { }

  /**
   * Registers a new voter with a post request, returns sessionId token
   * @param newVoter voter info used for setup
   */
  registerVoter(newVoter: NewVoter): Observable<Voter> {
    const connectionId = this.voteHubService.connection.connectionId;
    return this.voteRepositoryService.registerVoter(newVoter, connectionId);
  }

  /**
   * Creates a new room
   * @param roomName room info used for setup
   */
  createRoom(roomName: string): Observable<Room> {
    const connectionId = this.voteHubService.connection.connectionId;
    return this.voteRepositoryService.createRoom(roomName, connectionId);
  }

  /**
   * Gets voters from the voter repository for the current room
   */
  getVoters(): Observable<Voter[]> {
    return this.store.pipe(
      select(roomSelector),
      switchMap(room => this.voteRepositoryService.getVotersForRoom(room.id)),
    );
  }

  /**
   * Casts a vote using the current session ID from the state
   * @param vote Vote from the vote card clicked
   */
  castVote(vote: Vote): Observable<HttpResponse<any>> {
    return this.store.pipe(
      select(sessionIdSelector),
      filter(sessionId => !!sessionId),
      switchMap(sessionId => this.voteRepositoryService.castVote(sessionId, vote)),
    );
  }

  /**
   * Leave the current game / room
   * @param sessionId id of the voter to remove from room
   */
  leaveRoom(sessionId: string): Observable<HttpResponse<any>> {
    const connectionId = this.voteHubService.connection.connectionId;
    return this.voteRepositoryService.leaveRoom(sessionId, connectionId);
  }

  /**
   * Dealer locks voting
   */
  lockVoting(): Observable<HttpResponse<any>> {
    return this.store.pipe(
      select(roomSelector),
      switchMap(room => this.voteRepositoryService.lockVoting(room.id)),
    );
  }

  /**
   * Dealer clears votes
   */
  clearVotes(): Observable<HttpResponse<any>> {
    return this.store.pipe(
      select(roomSelector),
      switchMap(room => this.voteRepositoryService.clearVotes(room.id)),
    );
  }

  /**
   * Finish game and delete room
   */
  finishGame(): Observable<HttpResponse<any>> {
    return this.store.pipe(
      select(roomSelector),
      switchMap(room => this.voteRepositoryService.finishGame(room.id)),
    );
  }

}
