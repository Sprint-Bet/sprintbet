import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { mergeMap, map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { VoteService } from '../services/vote.service';
import {
    roomPageNavigatedAction,
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
} from './app.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { VoteHubService } from '../services/hub-services/vote-hub.service';
import { Voter } from '../model/dtos/voter';
import { HubEvents } from '../services/hub-services/hubEvents.enum';
import { LocalStorageService } from '../services/local-storage.service';
import { StorageKey } from '@src/app/enums/storage-key.enum';
import { AppState } from './app.state';
import { sessionIdSelector } from './app.selectors';

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

    registerVoters$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(welcomePageJoinRoomClickedAction),
            mergeMap(action => this.voteService.registerVoter(action.registrationInfo).pipe(
                map(createdVoter => welcomePageJoinRoomSuccessAction({ createdVoter })),
                catchError((error: HttpErrorResponse) => of(welcomePageJoinRoomFailAction({ error }))),
            ))
        )
    );

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
            switchMap(() => this.router.navigate(['rooms'], { queryParams: { name: 'GROUP_NAME' } })),
        ),
        { dispatch: false }
    );

    getVoters$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageNavigatedAction),
            mergeMap(_ => this.voteService.getAllVoters().pipe(
                map(initialVoters => roomPageVotersLoadedSuccessAction({ voters: initialVoters })),
                catchError((error: HttpErrorResponse) => of(roomPageVotersLoadedFailAction({ error }))),
            ))
        )
    );

    getMyInformation$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageVotersLoadedSuccessAction),
            withLatestFrom(this.store.pipe(select(sessionIdSelector))),
            map(([action, sessionId]) => action.voters.find(voter => voter.id === sessionId)),
            map(myInformation => roomPageSetMyInformationAction({ myInformation }))
        )
    );

    startSignalR$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageNavigatedAction),
            mergeMap(() => this.voteHubService.startConnection().pipe(
                map(() => signalRConnectionSuccessAction()),
                catchError(error => of(signalRConnectionFailAction(error))),
            ))
        )
    );

    updateVoters$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(signalRConnectionSuccessAction),
            switchMap(() => this.voteHubService.listenFor<Voter[]>(HubEvents.VotingUpdated)),
            map(updatedVoters => signalRVotingUpdatedAction({ updatedVoters })),
        )
    );

    updateVotingLocked$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(signalRConnectionSuccessAction),
            switchMap(() => this.voteHubService.listenFor(HubEvents.VotingLocked)),
            map(() => signalRVotingLockedAction()),
        )
    );

    updateVotingUnlocked$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(signalRConnectionSuccessAction),
            switchMap(() => this.voteHubService.listenFor(HubEvents.VotingUnlocked)),
            map(() => signalRVotingUnlockedAction()),
        )
    );

    castVote$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageVoteClickedAction),
            mergeMap(action => this.voteService.castVote(action.vote).pipe(
                map(() => roomPageVoteSuccessAction()),
                catchError(error => of(roomPageVoteFailAction(error))),
            ))
        )
    );

    leaveRoom$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageLeaveConfirmedAction),
            mergeMap(action => this.voteService.leaveRoom(action.sessionId).pipe(
                map(() => roomPageLeaveSuccessAction()),
                catchError(error => of(roomPageLeaveFailAction(error))),
            )),
        )
    );

    routeToWelcomePage$: Observable<boolean> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageLeaveSuccessAction),
            switchMap(() => this.router.navigate(['/'])),
        ),
        { dispatch: false }
    );

    wipeIdFromLocalStorage$: Observable<void> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageLeaveSuccessAction),
            map(_ => this.localStorageService.deleteItem(StorageKey.SESSION_ID)),
        ),
        { dispatch: false }
    );

    lockVoting$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageLockClickedAction),
            mergeMap(() => this.voteService.lockVoting().pipe(
                map(() => roomPageLockSuccessAction()),
                catchError(error => of(roomPageLockFailAction(error))),
            ))
        )
    );

    clearVotes$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageClearVotesClickedAction),
            mergeMap(() => this.voteService.clearVotes().pipe(
                map(() => roomPageClearVotesSuccessAction()),
                catchError(error => of(roomPageClearVotesFailAction(error))),
            ))
        )
    );
}
