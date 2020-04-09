import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { VoteService } from '../services/vote.service';
import { roomPageNavigatedAction, votersLoadedFailAction, votersLoadedSuccessAction } from './app.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private voterService: VoteService,
    ) {}

    getVoters$: Observable<Action> = createEffect(
        () => this.actions$.pipe(
            ofType(roomPageNavigatedAction),
            mergeMap(action => this.voterService.setupVoter(action.newVoterName).pipe(
                map(initialVoters => votersLoadedSuccessAction({ voters: initialVoters })),
                catchError((error: HttpErrorResponse) => of(votersLoadedFailAction({ error }))),
            ))
        )
    );
}
