import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Voter } from '../model/dtos/voter';
import { NewVoter } from '../model/dtos/new-voter';
import { Vote } from '../model/dtos/vote';
import { Room } from '../model/dtos/room';
import { RoleType } from '../enums/role-type.enum';

export enum ActionType {
    NAVIGATION_TO_APP_COMPONENT = '[Navigation] Started the app',
    NAVIGATION_TO_WELCOME_PAGE = '[Navigation] Welcome page loaded',
    NAVIGATION_TO_ROOM_PAGE = '[Navigation] Room page loaded',
    NAVIGATION_TO_ROOM_GUARD = '[Navigation] Room guard reached',
    WELCOME_PAGE_JOIN_ROOM_CLICKED = '[Welcome page] Clicked to join room',
    WELCOME_PAGE_JOIN_ROOM_SUCCESS = '[Welcome page] Joined room successfully',
    WELCOME_PAGE_JOIN_ROOM_FAIL = '[Welcome page] Failed to join room',
    WELCOME_PAGE_CREATE_ROOM_CLICKED = '[Welcome page] Create room clicked',
    WELCOME_PAGE_CREATE_ROOM_SUCCESS = '[Welcome page] Created room successfully',
    WELCOME_PAGE_CREATE_ROOM_FAIL = '[Welcome page] Failed to create room',
    ROOM_PAGE_VOTE_CLICKED = '[Room page] Clicked to vote',
    ROOM_PAGE_VOTE_SUCCESS = '[Room page] Voted successfully',
    ROOM_PAGE_VOTE_FAIL = '[Room page] Failed to vote',
    ROOM_PAGE_LEAVE_CONFIRMED = '[Room page] Clicked confirm to leave room',
    ROOM_PAGE_LEAVE_SUCCESS = '[Room page] left room successfully',
    ROOM_PAGE_LEAVE_FAIL = '[Room page] Failed to leave room',
    ROOM_PAGE_LOCK_CLICKED = '[Room page] Clicked to lock voting',
    ROOM_PAGE_LOCK_SUCCESS = '[Room page] Locked voting successfully',
    ROOM_PAGE_LOCK_FAIL = '[Room page] Failed to lock voting',
    ROOM_PAGE_CLEAR_VOTES_CLICKED = '[Room page] Clicked to clear votes',
    ROOM_PAGE_CLEAR_VOTES_SUCCESS = '[Room page] Cleared votes successfully',
    ROOM_PAGE_CLEAR_VOTES_FAIL = '[Room page] Failed to clear votes',
    ROOM_PAGE_VOTERS_LOADED_SUCCESS = '[Room page] Voters loaded successfully',
    ROOM_PAGE_VOTERS_LOADED_FAIL = '[Room page] Voters failed to load',
    ROOM_PAGE_SET_MY_INFORMATION = '[Room page] Set my voting information',
    ROOM_PAGE_FINISH_CLICKED = '[Room page] Clicked to finish game',
    ROOM_PAGE_FINISH_SUCCESS = '[Room page] Finished game successfully',
    ROOM_PAGE_FINISH_FAIL = '[Room page] Failed to finish game',
    ROOM_PAGE_CHANGE_ROLE_CLICKED = '[Room page] Change role',
    ROOM_PAGE_CHANGE_ROLE_SUCCESS = '[Room page] Changed role successfully',
    ROOM_PAGE_CHANGE_ROLE_FAIL = '[Room page] Failed to change role',
    SIGNAL_R_CONNECTION_START = '[Signal R] Signal R connection started',
    SIGNAL_R_CONNECTION_SUCCESS = '[Signal R] Signal R connected successfully',
    SIGNAL_R_CONNECTION_FAIL = '[Signal R] Signal R failed to connect',
    SIGNAL_R_DISCONNECTION_START = '[Signal R] Signal R start disconnecting',
    SIGNAL_R_DISCONNECTION_SUCCESS = '[Signal R] Signal R disconnected successfully',
    SIGNAL_R_DISCONNECTION_FAIL = '[Signal R] Signal R failed to disconnect',
    SIGNAL_R_VOTING_UPDATED = '[Signal R] Signal R voting updated event received',
    SIGNAL_R_VOTING_LOCKED = '[Signal R] Signal R voting locked event received',
    SIGNAL_R_VOTING_UNLOCKED = '[Signal R] Signal R voting unlocked event received',
    SIGNAL_R_INFORM_VOTERS_GAME_FINISHED_FAIL = '[Signal R] Signal R failed to inform voters that game finished',
    GUARD_GET_VOTER_REQUEST = '[Room guard] Room guard requested a voter',
    GUARD_GET_VOTER_SUCCESS = '[Room guard] Room guard successfully requested a voter',
    GUARD_GET_VOTER_FAIL = '[Room guard] Room guard failed to request a voter',
    GUARD_ID_NOT_FOUND_IN_STATE = '[Room guard] Adding local storage id to the state',
}

/**
 * Navigation actions
 */
export const appComponentNavigatedAction = createAction(
    ActionType.NAVIGATION_TO_APP_COMPONENT
);
export const welcomeComponentNavigatedAction = createAction(
    ActionType.NAVIGATION_TO_WELCOME_PAGE
);
export const roomPageNavigatedAction = createAction(
    ActionType.NAVIGATION_TO_ROOM_PAGE
);
export const roomGuardNavigatedAction = createAction(
  ActionType.NAVIGATION_TO_ROOM_GUARD
);

/**
 * Welcome page actions
 */
export const welcomePageJoinRoomClickedAction = createAction(
    ActionType.WELCOME_PAGE_JOIN_ROOM_CLICKED,
    props<{ registrationInfo: NewVoter }>()
);
export const welcomePageJoinRoomSuccessAction = createAction(
    ActionType.WELCOME_PAGE_JOIN_ROOM_SUCCESS,
    props<{ createdVoter: Voter }>()
);
export const welcomePageJoinRoomFailAction = createAction(
    ActionType.WELCOME_PAGE_JOIN_ROOM_FAIL,
    props<{ error: HttpErrorResponse }>()
);
export const welcomePageCreateRoomClickedAction = createAction(
    ActionType.WELCOME_PAGE_CREATE_ROOM_CLICKED,
    props<{ registrationInfo: NewVoter }>()
);
export const welcomePageCreateRoomSuccessAction = createAction(
    ActionType.WELCOME_PAGE_CREATE_ROOM_SUCCESS,
    props<{ createdRoom: Room }>()
);
export const welcomePageCreateRoomFailAction = createAction(
    ActionType.WELCOME_PAGE_CREATE_ROOM_FAIL,
    props<{ error: HttpErrorResponse }>()
);

/**
 * Stored Session id actions
 */
export const storedIdNotFoundInStateAction = createAction(
    ActionType.GUARD_ID_NOT_FOUND_IN_STATE,
    props<{ sessionId: string }>()
);

/**
 * Room page actions
 */
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
export const roomPageClearVotesClickedAction = createAction(
    ActionType.ROOM_PAGE_CLEAR_VOTES_CLICKED
);
export const roomPageClearVotesSuccessAction = createAction(
    ActionType.ROOM_PAGE_CLEAR_VOTES_SUCCESS
);
export const roomPageClearVotesFailAction = createAction(
    ActionType.ROOM_PAGE_CLEAR_VOTES_FAIL,
    props<{ error: HttpErrorResponse }>()
);
export const roomPageVotersLoadedSuccessAction = createAction(
    ActionType.ROOM_PAGE_VOTERS_LOADED_SUCCESS,
    props<{ voters: Voter[] }>()
);
export const roomPageVotersLoadedFailAction = createAction(
    ActionType.ROOM_PAGE_VOTERS_LOADED_FAIL,
    props<{ error: HttpErrorResponse }>()
);
export const roomPageSetMyInformationAction = createAction(
    ActionType.ROOM_PAGE_SET_MY_INFORMATION,
    props<{ myInformation: Voter }>()
);
export const roomPageFinishClickedAction = createAction(
    ActionType.ROOM_PAGE_FINISH_CLICKED
);
export const roomPageFinishSuccessAction = createAction(
    ActionType.ROOM_PAGE_FINISH_SUCCESS,
);
export const roomPageFinishFailAction = createAction(
    ActionType.ROOM_PAGE_FINISH_FAIL,
    props<{ error: HttpErrorResponse }>()
);
export const roomPageChangeRoleClickedAction = createAction(
  ActionType.ROOM_PAGE_CHANGE_ROLE_CLICKED,
  props<{ voterId: string, role: RoleType }>()
);
export const roomPageChangeRoleSuccessAction = createAction(
  ActionType.ROOM_PAGE_CHANGE_ROLE_SUCCESS,
  props<{ myInformation: Voter }>()
);
export const roomPageChangeRoleFailAction = createAction(
  ActionType.ROOM_PAGE_CHANGE_ROLE_FAIL,
  props<{ error: HttpErrorResponse }>()
);

/**
 * Signal r actions
 */
export const signalRConnectionStartAction = createAction(
  ActionType.SIGNAL_R_CONNECTION_START
);
export const signalRConnectionSuccessAction = createAction(
    ActionType.SIGNAL_R_CONNECTION_SUCCESS
);
export const signalRConnectionFailAction = createAction(
    ActionType.SIGNAL_R_CONNECTION_FAIL,
    props<{ error: any }>()
);
export const signalRDisconnectionStartAction = createAction(
    ActionType.SIGNAL_R_DISCONNECTION_START
);
export const signalRDisconnectionSuccessAction = createAction(
    ActionType.SIGNAL_R_DISCONNECTION_SUCCESS
);
export const signalRDisconnectionFailAction = createAction(
    ActionType.SIGNAL_R_DISCONNECTION_FAIL,
    props<{ error: HttpErrorResponse }>()
);
export const signalRVotingUpdatedAction = createAction(
    ActionType.SIGNAL_R_VOTING_UPDATED,
    props<{ updatedVoters: Voter[] }>()
);
export const signalRVotingLockedAction = createAction(
    ActionType.SIGNAL_R_VOTING_LOCKED
);
export const signalRVotingUnlockedAction = createAction(
    ActionType.SIGNAL_R_VOTING_UNLOCKED
);
export const signalRInformVotersGameFinishedFail = createAction(
    ActionType.SIGNAL_R_INFORM_VOTERS_GAME_FINISHED_FAIL,
    props<{ error: any }>()
);

/**
 * Guard actions
 */
export const roomGuardReconnectVoterRequestAction = createAction(
  ActionType.GUARD_GET_VOTER_REQUEST,
  props<{ voterId: string }>()
);
export const roomGuardReconnectVoterSuccessAction = createAction(
  ActionType.GUARD_GET_VOTER_SUCCESS,
  props<{ voter: Voter }>()
);
export const roomGuardReconnectVoterFailAction = createAction(
  ActionType.GUARD_GET_VOTER_FAIL,
  props<{ error: HttpErrorResponse }>()
);
