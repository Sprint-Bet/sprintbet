import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, filter, first, withLatestFrom } from 'rxjs/operators';
import { Voter } from '../model/dtos/voter';
import { NewVoter } from '../model/dtos/new-voter';
import { VoteRepositoryService } from './repository-services/vote-repository.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { sessionIdSelector, roomSelector, tokenSelector } from '../state/app.selectors';
import { Vote } from '../model/dtos/vote';
import { HttpResponse } from '@angular/common/http';
import { Room } from '../model/dtos/room';
import { VoteHubService } from './hub-services/vote-hub.service';
import { RoleType } from '../enums/role-type.enum';
import { ItemsType } from '../enums/items-type.enum';
import { NewVoterResponse } from '../model/dtos/new-voter-response';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private voteRepositoryService: VoteRepositoryService,
    private store: Store<AppState>,
    private voteHubService: VoteHubService,
  ) { }

  
  /* Dealer functions */


  /**
   * Registers a new voter with a post request, returns sessionId token
   * @param newVoter voter info used for setup
   */
  registerVoter(newVoter: NewVoter): Observable<NewVoterResponse> {
    const connectionId = this.voteHubService.connection.connectionId;
    return this.voteRepositoryService.registerVoter(newVoter, connectionId);
  }

  /**
   * Creates a new room
   * @param itemsType Determines which voting items to create the room with
   */
  createRoom(itemsType: ItemsType = ItemsType.FIBONACCI): Observable<Room> {
    const connectionId = this.voteHubService.connection.connectionId;
    return this.voteRepositoryService.createRoom(itemsType, connectionId);
  }

  /**
   * Gets voters from the voter repository for the current room
   */
  getVoters(): Observable<Voter[]> {
    return this.store.pipe(
      select(roomSelector),
      first(),
      switchMap(room => this.voteRepositoryService.getVotersForRoom(room.id)),
    );
  }

  /**
   * Casts a vote using the current session ID from the state
   * @param vote Vote from the vote card clicked
   */
  castVote(vote: Vote): Observable<string> {
    return this.store.pipe(
      select(sessionIdSelector),
      filter(sessionId => !!sessionId),
      first(),
      withLatestFrom(this.store.pipe(select(tokenSelector))),
      switchMap(([sessionId, token]) => {
        return this.voteRepositoryService.castVote(sessionId, vote, token);
      }),
    );
  }

  /**
   * Change the role of the voter to player (0) or spectator (1)
   * @param voterId Id of the voter
   * @param role Role that the voter wishes to change to
   */
  changeRole(voterId: string, role: RoleType): Observable<string> {
    return this.store.pipe(
      select(tokenSelector),
      first(),
      switchMap(token => this.voteRepositoryService.changeRole(voterId, role, token))
    );
  }

  /**
   * Leave the current game / room
   * @param sessionId id of the voter to remove from room
   */
  leaveRoom(sessionId: string): Observable<HttpResponse<any>> {
    const connectionId = this.voteHubService.connection.connectionId;
    // return this.voteRepositoryService.leaveRoom(sessionId, connectionId);
    return this.store.pipe(
      select(tokenSelector),
      first(),
      switchMap(token => this.voteRepositoryService.leaveRoom(sessionId, connectionId, token))
    );
  }


  /* Dealer functions */


  /**
   * Dealer locks voting
   */
  lockVoting(): Observable<boolean> {
    return this.store.pipe(
      select(roomSelector),
      first(),
      switchMap(room => this.voteRepositoryService.lockVoting(room.id)),
    );
  }

  /**
   * Dealer clears votes
   */
  clearVotes(): Observable<boolean> {
    return this.store.pipe(
      select(roomSelector),
      first(),
      switchMap(room => this.voteRepositoryService.clearVotes(room.id)),
    );
  }

  /**
   * Dealer changes voting items for the room
   * @param itemsType the item type for the room
   */
  changeItems(itemsType: ItemsType): Observable<string[]> {
    return this.store.pipe(
      select(roomSelector),
      first(),
      switchMap(room => this.voteRepositoryService.changeItems(room.id, itemsType)),
    );
  }

  /**
   * Finish game and delete room
   */
  finishGame(): Observable<HttpResponse<any>> {
    return this.store.pipe(
      select(roomSelector),
      first(),
      switchMap(room => this.voteRepositoryService.finishGame(room.id)),
    );
  }

  /**
   * Reconnect voter from the stored session id
   * @param voterId voter to reconnect
   */
  reconnectVoter(voterId: string): Observable<Voter> {
    const connectionId = this.voteHubService.connection.connectionId;
    return this.voteRepositoryService.reconnectVoter(voterId, connectionId);
  }

}
