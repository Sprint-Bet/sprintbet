import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { mergeMap, map, catchError, switchMap, withLatestFrom, first, filter } from 'rxjs/operators';
import { VoteService } from '../services/vote.service';
import {
  welcomeComponentNavigatedAction,
  roomPageVotersLoadedFailAction,
  roomPageVotersLoadedSuccessAction,
  welcomePageJoinRoomClickedAction,
  welcomePageJoinRoomSuccessAction,
  welcomePageJoinRoomFailAction,
  signalRConnectionSuccessAction,
  signalRConnectionFailAction,
  signalRVotingUpdatedAction,
  roomPageVoteClickedAction,
  roomPageVoteFailAction,
  roomPageVoteSuccessAction,
  roomPageLeaveConfirmedAction,
  roomPageLeaveSuccessAction,
  roomPageLeaveFailAction,
  signalRVotingLockedAction,
  roomPageLockClickedAction,
  roomPageLockSuccessAction,
  roomPageLockFailAction,
  roomPageClearVotesClickedAction,
  roomPageClearVotesSuccessAction,
  roomPageClearVotesFailAction,
  signalRVotingUnlockedAction,
  roomPageSetMyInformationAction,
  welcomePageCreateRoomClickedAction,
  welcomePageCreateRoomSuccessAction,
  welcomePageCreateRoomFailAction,
  roomPageNavigatedAction,
  roomPageFinishClickedAction,
  roomPageFinishSuccessAction,
  roomPageFinishFailAction,
  signalRDisconnectionSuccessAction,
  signalRDisconnectionFailAction,
  signalRDisconnectionStartAction,
  signalRInformVotersGameFinishedFail,
  roomPageChangeRoleClickedAction,
  roomPageChangeRoleSuccessAction,
  roomPageChangeRoleFailAction,
  roomGuardReconnectVoterRequestAction,
  roomGuardReconnectVoterSuccessAction,
  roomGuardReconnectVoterFailAction,
  signalRConnectionStartAction,
  roomGuardNavigatedAction,
  welcomeComponentCreateNavigatedAction,
  welcomeComponentJoinNavigatedAction,
  roomPageChangeRoomItemsClickedAction,
  roomPageChangeRoomItemsSuccessAction,
  roomPageChangeRoomItemsFailAction
} from './app.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { VoteHubService } from '../services/hub-services/vote-hub.service';
import { Voter } from '../model/dtos/voter';
import { HubEvents } from '../services/hub-services/hubEvents.enum';
import { LocalStorageService } from '../services/local-storage.service';
import { StorageKey } from 'src/app/enums/storage-key.enum';
import { AppState, InitialMyInformation } from './app.state';
import { sessionIdSelector, roomSelector, registrationInfoSelector, signalRConnectedSelector } from './app.selectors';
import { HubMethods } from '../services/hub-services/hubMethods.enum';
import { HubConnectionState } from '@microsoft/signalr';
import { RoleType } from '../enums/role-type.enum';
import { ItemsType } from '../enums/items-type.enum';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private voteService: VoteService,
    private voteHubService: VoteHubService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
  ) { }

  /**
   * Welcome page effects
   */
  createRoom$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(welcomePageCreateRoomClickedAction),
      mergeMap(action => this.voteService.createRoom(action.registrationInfo.itemsType).pipe(
        map(createdRoom => welcomePageCreateRoomSuccessAction({ createdRoom })),
        catchError((error: HttpErrorResponse) => of(welcomePageCreateRoomFailAction({ error }))),
      ))
    )
  );

  registerDealer$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(welcomePageCreateRoomSuccessAction),
      withLatestFrom(this.store.pipe(select(registrationInfoSelector))),
      map(([action, registrationInfo]) => {
        return !!registrationInfo
          ? { ...registrationInfo, group: action.createdRoom.id }
          : { name: '', group: '', role: '' as RoleType, itemsType: '' as ItemsType }
      }),
      mergeMap(registrationInfo => this.voteService.registerVoter(registrationInfo).pipe(
        map(createdVoter => welcomePageJoinRoomSuccessAction({ createdVoter })),
        catchError((error: HttpErrorResponse) => of(welcomePageJoinRoomFailAction({ error }))),
      ))
    )
  );

  registerVoter$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(welcomePageJoinRoomClickedAction),
      mergeMap(action => this.voteService.registerVoter(action.registrationInfo).pipe(
        map(createdVoter => welcomePageJoinRoomSuccessAction({ createdVoter })),
        catchError((error: HttpErrorResponse) => of(welcomePageJoinRoomFailAction({ error }))),
      ))
    )
  );

  /**
   * Stored session effects
   */
  saveIdToLocalStorage$: Observable<void> = createEffect(
    () => this.actions$.pipe(
      ofType(welcomePageJoinRoomSuccessAction),
      map(action => this.localStorageService.setItem(StorageKey.SESSION_ID, action.createdVoter.id)),
    ),
    { dispatch: false }
  );

  routeToRoomPage$: Observable<boolean> = createEffect(
    () => this.actions$.pipe(
      ofType(welcomePageJoinRoomSuccessAction),
      switchMap(action => this.router.navigate(['room'], { queryParams: { id: action.createdVoter.room.id } })),
    ),
    { dispatch: false }
  );

  /**
   * Room page effects
   */
  getVoters$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageNavigatedAction),
      mergeMap(_ => this.voteService.getVoters().pipe(
        map(initialVoters => roomPageVotersLoadedSuccessAction({ voters: initialVoters })),
        catchError((error: HttpErrorResponse) => of(roomPageVotersLoadedFailAction({ error }))),
      ))
    )
  );

  getMyInformation$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageVotersLoadedSuccessAction, signalRVotingUpdatedAction),
      withLatestFrom(this.store.pipe(select(sessionIdSelector))),
      map(([action, sessionId]) => action.voters.find(voter => voter.id === sessionId)),
      map(myInformation => {
        return !myInformation
          ? roomPageSetMyInformationAction({ myInformation: InitialMyInformation })
          : roomPageSetMyInformationAction({ myInformation })
      })
    )
  );

  listenForVoterUpdates$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageVotersLoadedSuccessAction),
      switchMap(() => this.voteHubService.listenFor<Voter[]>(HubEvents.VotingUpdated)),
      map(updatedVoters => signalRVotingUpdatedAction({ voters: updatedVoters })),
    )
  );

  listenForVotingLocked$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageVotersLoadedSuccessAction),
      switchMap(() => this.voteHubService.listenFor(HubEvents.VotingLocked)),
      map(() => signalRVotingLockedAction()),
    )
  );

  listenForVotingUnlocked$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageVotersLoadedSuccessAction),
      switchMap(() => this.voteHubService.listenFor(HubEvents.VotingUnlocked)),
      map(() => signalRVotingUnlockedAction()),
    )
  );

  listenForGameFinished$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageVotersLoadedSuccessAction),
      switchMap(() => this.voteHubService.listenFor(HubEvents.GameFinished)),
      map(() => signalRDisconnectionStartAction()),
    )
  );

  castVote$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageVoteClickedAction),
      mergeMap(action => this.voteService.castVote(action.vote).pipe(
        map(() => roomPageVoteSuccessAction()),
        catchError(error => of(roomPageVoteFailAction({ error }))),
      ))
    )
  );

  leaveRoom$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageLeaveConfirmedAction),
      mergeMap(action => this.voteService.leaveRoom(action.sessionId).pipe(
        map(() => roomPageLeaveSuccessAction()),
        catchError(error => of(roomPageLeaveFailAction({ error }))),
      )),
    )
  );

  changeRole$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageChangeRoleClickedAction),
      mergeMap(action => this.voteService.changeRole(action.voterId, action.role).pipe(
        map(updatedRole => roomPageChangeRoleSuccessAction({ updatedRole })),
        catchError(error => of(roomPageChangeRoleFailAction({ error }))),
      ))
    )
  );

  changeRoomItems$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageChangeRoomItemsClickedAction),
      mergeMap(action => this.voteService.changeItems(action.itemsType).pipe(
        map(newItems => roomPageChangeRoomItemsSuccessAction({ newItems })),
        catchError(error => of(roomPageChangeRoomItemsFailAction({ error }))),
      ))
    )
  );

  /**
   * Signal R related effects
   */
  startSignalR$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(signalRConnectionStartAction),
      mergeMap(() => this.voteHubService.startConnection().pipe(
        map(() => signalRConnectionSuccessAction()),
        catchError(error => of(signalRConnectionFailAction({ error }))),
      ))
    )
  );

  disconnectSignalR$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(signalRDisconnectionStartAction, roomPageLeaveSuccessAction),
      mergeMap(() => this.voteHubService.disconnect().pipe(
        map(() => signalRDisconnectionSuccessAction()),
        catchError(error => of(signalRDisconnectionFailAction({ error }))),
      ))
    )
  );

  requestSignalRConnect$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(welcomeComponentNavigatedAction,
        welcomeComponentCreateNavigatedAction,
        welcomeComponentJoinNavigatedAction,
        roomGuardNavigatedAction),
      filter(() => this.voteHubService.connection.state === HubConnectionState.Disconnected),
      switchMap(() => of(signalRConnectionStartAction())),
    )
  );

  wipeIdFromLocalStorage$: Observable<void> = createEffect(
    () => this.actions$.pipe(
      ofType(signalRDisconnectionSuccessAction),
      map(_ => this.localStorageService.deleteItem(StorageKey.SESSION_ID)),
    ),
    { dispatch: false }
  );

  routeToWelcomePage$: Observable<boolean> = createEffect(
    () => this.actions$.pipe(
      ofType(signalRDisconnectionSuccessAction),
      switchMap(() => this.router.navigate(['/'])),
    ),
    { dispatch: false }
  );

  /**
   * Dealer effects
   */
  lockVoting$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageLockClickedAction),
      mergeMap(() => this.voteService.lockVoting().pipe(
        map(() => roomPageLockSuccessAction()),
        catchError(error => of(roomPageLockFailAction({ error }))),
      ))
    )
  );

  clearVotes$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageClearVotesClickedAction),
      mergeMap(() => this.voteService.clearVotes().pipe(
        map(() => roomPageClearVotesSuccessAction()),
        catchError(error => of(roomPageClearVotesFailAction({ error }))),
      ))
    )
  );

  finishGame$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageFinishClickedAction),
      mergeMap(() => this.voteService.finishGame().pipe(
        map(() => roomPageFinishSuccessAction()),
        catchError(error => of(roomPageFinishFailAction({ error }))),
      ))
    )
  );

  informVotersGameFinished$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomPageFinishSuccessAction),
      switchMap(() => this.store.pipe(select(roomSelector), first())),
      mergeMap(room => this.voteHubService.invoke<void>(HubMethods.FinishGame, room?.id).pipe(
        map(() => signalRDisconnectionStartAction()),
        catchError(error => of(signalRInformVotersGameFinishedFail({ error }))),
      )),
    )
  );

  /**
   * Room guard effects
   */
  getVoter$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomGuardReconnectVoterRequestAction),
      mergeMap(action => this.voteService.reconnectVoter(action.voterId).pipe(
        map(voter => roomGuardReconnectVoterSuccessAction({ voter })),
        catchError(error => of(roomGuardReconnectVoterFailAction({ error }))),
      )),
    )
  );

  routeToWelcomePageWithError$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(roomGuardReconnectVoterFailAction),
      switchMap(() => this.router.navigate(['/'], { queryParams: { error: true } })),
      map(() => signalRDisconnectionStartAction()),
    )
  );

}
