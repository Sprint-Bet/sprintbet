import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Voter } from '../model/dtos/voter';
import { NewVoter } from '../model/dtos/new-voter';

export enum ActionType {
    WELCOME_PAGE_JOIN_ROOM_CLICKED = '[Welcome page] Clicked to join room',
    WELCOME_PAGE_JOIN_ROOM_SUCCESS = '[Welcome page] Joined room successfully',
    WELCOME_PAGE_JOIN_ROOM_FAIL = '[Welcome page] Failed to join room',
    ROOM_PAGE_NAVIGATED = '[Room page] Navigated to room page',
    VOTERS_LOADED_SUCCESS = '[Room page] Voters loaded successfully',
    VOTERS_LOADED_FAIL = '[Room page] Voters failed to load',
}

export const welcomePageJoinRoomClickedAction = createAction(
    ActionType.WELCOME_PAGE_JOIN_ROOM_CLICKED,
    props<{ registrationInfo: NewVoter }>()
);

export const welcomePageJoinRoomSuccessAction = createAction(
    ActionType.WELCOME_PAGE_JOIN_ROOM_SUCCESS,
    props<{ sessionId: string }>()
);

export const welcomePageJoinRoomFailAction = createAction(
    ActionType.WELCOME_PAGE_JOIN_ROOM_FAIL,
    props<{ error: HttpErrorResponse }>()
);

export const roomPageNavigatedAction = createAction(
    ActionType.ROOM_PAGE_NAVIGATED,
    props<{ newVoterName: string }>()
);

export const votersLoadedSuccessAction = createAction(
    ActionType.VOTERS_LOADED_SUCCESS,
    props<{ voters: Voter[] }>()
);

export const votersLoadedFailAction = createAction(
    ActionType.VOTERS_LOADED_FAIL,
    props<{ error: HttpErrorResponse }>()
);
