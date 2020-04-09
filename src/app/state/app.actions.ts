import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum ActionType {
    ROOM_PAGE_NAVIGATED = '[Room Page] Navigated to room page',
    VOTERS_LOADED_SUCCESS = '[Room Page] Voters loaded successfully',
    VOTERS_LOADED_FAIL = '[Room Page] Voters failed to load',
}

export const roomPageNavigatedAction = createAction(
    ActionType.ROOM_PAGE_NAVIGATED,
    props<{ newVoterName: string }>()
);

export const votersLoadedSuccessAction = createAction(
    ActionType.VOTERS_LOADED_SUCCESS,
    props<{ voters: { Voter } }>()
);

export const votersLoadedFailAction = createAction(
    ActionType.VOTERS_LOADED_FAIL,
    props<{ error: HttpErrorResponse }>()
);
