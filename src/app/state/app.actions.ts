import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Voter } from '../model/dtos/voter';
import { NewVoter } from '../model/dtos/new-voter';
import { Vote } from '../model/dtos/vote';

export enum ActionType {
    WELCOME_PAGE_JOIN_ROOM_CLICKED = '[Welcome page] Clicked to join room',
    WELCOME_PAGE_JOIN_ROOM_SUCCESS = '[Welcome page] Joined room successfully',
    WELCOME_PAGE_JOIN_ROOM_FAIL = '[Welcome page] Failed to join room',
    STORED_ID_NOT_FOUND_IN_STATE = '[Welcome guard] Adding local storage id to the state',
    ROOM_PAGE_NAVIGATED = '[Room page] Navigated to room page',
    ROOM_PAGE_VOTE_CLICKED = '[Room page] Clicked to vote',
    ROOM_PAGE_VOTE_SUCCESS = '[Room page] Voted successfully',
    ROOM_PAGE_VOTE_FAIL = '[Room page] Failed to vote',
    ROOM_PAGE_LEAVE_CONFIRMED = '[Room page] Clicked confirm to leave room',
    ROOM_PAGE_LEAVE_SUCCESS = '[Room page] left room successfully',
    ROOM_PAGE_LEAVE_FAIL = '[Room page] Failed to leave room',
    ROOM_PAGE_LOCK_CLICKED = '[Room page] Clicked to lock voting',
    ROOM_PAGE_LOCK_SUCCESS = '[Room page] Locked voting successfully',
    ROOM_PAGE_LOCK_FAIL = '[Room page] Failed to lock voting',
    VOTERS_LOADED_SUCCESS = '[Room page] Voters loaded successfully',
    VOTERS_LOADED_FAIL = '[Room page] Voters failed to load',
    SIGNAL_R_CONNECTION_SUCCESS = '[Signal R] Signal R connected successfully',
    SIGNAL_R_CONNECTION_FAIL = '[Signal R] Signal R failed to connect',
    SIGNAL_R_VOTING_UPDATED = '[Signal R] Signal R voting updated event received',
    SIGNAL_R_VOTING_LOCKED = '[Signal R] Signal R voting locked event received',
}

export const welcomePageJoinRoomClickedAction = createAction(
    ActionType.WELCOME_PAGE_JOIN_ROOM_CLICKED,
    props<{ registrationInfo: NewVoter }>()
);

export const welcomePageJoinRoomSuccessAction = createAction(
    ActionType.WELCOME_PAGE_JOIN_ROOM_SUCCESS,
    props<{ sessionId: string }>()
);

export const storedIdNotFoundInStateAction = createAction(
    ActionType.STORED_ID_NOT_FOUND_IN_STATE,
    props<{ sessionId: string }>()
);

export const welcomePageJoinRoomFailAction = createAction(
    ActionType.WELCOME_PAGE_JOIN_ROOM_FAIL,
    props<{ error: HttpErrorResponse }>()
);

export const roomPageNavigatedAction = createAction(
    ActionType.ROOM_PAGE_NAVIGATED
);

export const roomPageVoteClickedAction = createAction(
    ActionType.ROOM_PAGE_VOTE_CLICKED,
    props<{ vote: Vote }>()
);

export const roomPageVoteSuccessAction = createAction(
    ActionType.ROOM_PAGE_VOTE_SUCCESS
);

export const roomPageVoteFailAction = createAction(
    ActionType.ROOM_PAGE_VOTE_FAIL,
    props<{ error: HttpErrorResponse }>()
);

export const roomPageLeaveConfirmedAction = createAction(
    ActionType.ROOM_PAGE_LEAVE_CONFIRMED,
    props<{ sessionId: string }>()
);

export const roomPageLeaveSuccessAction = createAction(
    ActionType.ROOM_PAGE_LEAVE_SUCCESS
);

export const roomPageLeaveFailAction = createAction(
    ActionType.ROOM_PAGE_LEAVE_FAIL,
    props<{ error: HttpErrorResponse }>()
);

export const roomPageLockClickedAction = createAction(
    ActionType.ROOM_PAGE_LOCK_CLICKED
);

export const roomPageLockSuccessAction = createAction(
    ActionType.ROOM_PAGE_LOCK_SUCCESS
);

export const roomPageLockFailAction = createAction(
    ActionType.ROOM_PAGE_LOCK_FAIL,
    props<{ error: HttpErrorResponse }>()
);

export const votersLoadedSuccessAction = createAction(
    ActionType.VOTERS_LOADED_SUCCESS,
    props<{ voters: Voter[] }>()
);

export const votersLoadedFailAction = createAction(
    ActionType.VOTERS_LOADED_FAIL,
    props<{ error: HttpErrorResponse }>()
);

export const signalRConnectionSuccessAction = createAction(
    ActionType.SIGNAL_R_CONNECTION_SUCCESS
);

export const signalRConnectionFailAction = createAction(
    ActionType.SIGNAL_R_CONNECTION_FAIL,
    props<{ error: HttpErrorResponse }>()
);

export const signalRVotingUpdatedAction = createAction(
    ActionType.SIGNAL_R_VOTING_UPDATED,
    props<{ updatedVoters: Voter[] }>()
);

export const signalRVotingLockedAction = createAction(
    ActionType.SIGNAL_R_VOTING_LOCKED
);
