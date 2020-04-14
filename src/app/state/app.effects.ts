import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { VoteService } from '../services/vote.service';
import {
    roomPageNavigatedAction,
    votersLoadedFailAction,
    votersLoadedSuccessAction,
    welcomePageJoinRoomClickedAction,
    welcomePageJoinRoomSuccessAction,
    welcomePageJoinRoomFailAction,
    signalRConnectionSuccessAction,
    signalRConnectionFailAction,
    signalRVotingUpdatedAction,
    roomPageVoteClickedAction,
    roomPageVoteFailAction,
    roomPageVoteSuccessAction,
} from './app.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { VoteHubService } from '../services/hub-services/vote-hub.service';
import { HubEvents } from '../model/enums/hubEvents.enum';
import { Voter } from '../model/dtos/voter';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private voteService: VoteService,
        private voteHubService: VoteHubService,
        private router: Router,
    ) {}

    registerVoters$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(welcomePageJoinRoomClickedAction),
            mergeMap(action => this.voteService.registerVoter(action.registrationInfo).pipe(
                map(sessionId => welcomePageJoinRoomSuccessAction({ sessionId })),
                catchError((error: HttpErrorResponse) => of(welcomePageJoinRoomFailAction({ error }))),
            ))
        )
    );

    getVoters$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageNavigatedAction),
            mergeMap(_ => this.voteService.getAllVoters().pipe(
                map(initialVoters => votersLoadedSuccessAction({ voters: initialVoters })),
                catchError((error: HttpErrorResponse) => of(votersLoadedFailAction({ error }))),
            ))
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

    // TODO: Might need to get rid of listenFor<> method and simply use connection.on()
    updateVoters$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(signalRConnectionSuccessAction),
            switchMap(() => this.voteHubService.listenFor<Voter[]>(HubEvents.VotingUpdated)),
            map(updatedVoters => signalRVotingUpdatedAction({ updatedVoters })),
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

    routeToRoomPage$: Observable<boolean> = createEffect(
        () => this.actions$.pipe(
            ofType(welcomePageJoinRoomSuccessAction),
            switchMap(() => this.router.navigate(['rooms'], { queryParams: { name: 'GROUP_NAME' } })),
        ),
        { dispatch: false }
    );
}
