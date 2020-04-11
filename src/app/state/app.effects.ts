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
} from './app.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private voterService: VoteService,
        private router: Router,
    ) {}

    registerVoters$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(welcomePageJoinRoomClickedAction),
            mergeMap(action => this.voterService.registerVoter(action.registrationInfo).pipe(
                map(sessionId => welcomePageJoinRoomSuccessAction({ sessionId })),
                catchError((error: HttpErrorResponse) => of(welcomePageJoinRoomFailAction({ error }))),
            ))
        )
    );

    getVoters$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageNavigatedAction),
            mergeMap(_ => this.voterService.getAllVoters().pipe(
                map(initialVoters => votersLoadedSuccessAction({ voters: initialVoters })),
                catchError((error: HttpErrorResponse) => of(votersLoadedFailAction({ error }))),
            ))
        )
    );

    // TODO: Setup signalr updateVoters() effect here 

    routeToRoomPage$: Observable<boolean> = createEffect(
        () => this.actions$.pipe(
            ofType(welcomePageJoinRoomSuccessAction),
            switchMap(_ => this.router.navigate(['rooms' ], { queryParams: { name: 'Random' } })),
        ),
        { dispatch: false }
    );
}
