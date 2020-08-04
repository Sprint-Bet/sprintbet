import { AppState } from './app.state';
import { Action, createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.state';
import {
  roomPageVotersLoadedSuccessAction,
  roomPageVotersLoadedFailAction,
  welcomePageJoinRoomClickedAction,
  welcomePageJoinRoomSuccessAction,
  welcomePageJoinRoomFailAction,
  roomPageVoteSuccessAction,
  roomPageVoteFailAction,
  roomPageLockSuccessAction,
  roomPageLockFailAction,
  roomPageClearVotesSuccessAction,
  roomPageClearVotesFailAction,
  roomPageClearVotesClickedAction,
  roomPageLeaveConfirmedAction,
  roomPageLeaveFailAction,
  storedIdNotFoundInStateAction,
  signalRVotingUpdatedAction,
  signalRVotingLockedAction,
  signalRVotingUnlockedAction,
  roomPageSetMyInformationAction,
  welcomePageCreateRoomClickedAction,
  welcomePageCreateRoomSuccessAction,
  welcomePageCreateRoomFailAction,
  roomPageNavigatedAction,
  signalRDisconnectionSuccessAction,
  roomPageChangeRoleClickedAction,
  roomPageChangeRoleSuccessAction,
  roomPageChangeRoleFailAction,
  signalRConnectionSuccessAction,
  signalRConnectionFailAction,
  roomGuardReconnectVoterSuccessAction,
  roomGuardReconnectVoterFailAction,
  roomGuardReconnectVoterRequestAction,
  roomPageChangeRoomItemsFailAction,
  roomPageChangeRoomItemsSuccessAction,
  roomPageChangeRoomItemsClickedAction,
} from './app.actions';
import { RoleType } from '../enums/role-type.enum';

const appReducer = createReducer(
  initialAppState,
  /**
   * Welcome page
   */
  on(welcomePageJoinRoomClickedAction,
    (state): AppState => ({ ...state, loading: true })
  ),
  on(welcomePageJoinRoomSuccessAction,
    (state, { createdVoter }): AppState => ({
      ...state,
      loading: false,
      myInformation: createdVoter,
      error: null,
      room: createdVoter.room,
      votingLocked: createdVoter.room.locked
    })
  ),
  on(welcomePageJoinRoomFailAction,
    (state, { error }): AppState => ({ ...state, loading: false, error })
  ),
  on(welcomePageCreateRoomClickedAction,
    (state, { registrationInfo }): AppState => ({ ...state, registrationInfo, loading: true })
  ),
  on(welcomePageCreateRoomSuccessAction,
    (state, { createdRoom }): AppState => ({ ...state, loading: false, room: createdRoom, error: null })
  ),
  on(welcomePageCreateRoomFailAction,
    (state, { error }): AppState => ({ ...state, loading: false, error })
  ),

  /**
   * Stored session actions
   */
  on(storedIdNotFoundInStateAction,
    (state, { sessionId }): AppState => ({ ...state, loading: false, sessionId, error: null })
  ),

  /**
   * Room page
   */
  on(roomPageNavigatedAction,
    (state): AppState => ({ ...state, loading: true })
  ),
  on(roomPageVoteSuccessAction,
    (state): AppState => ({ ...state, loading: false, error: null })
  ),
  on(roomPageVoteFailAction,
    (state, { error }): AppState => ({ ...state, loading: false, error })
  ),
  on(roomPageLockSuccessAction,
    (state): AppState => ({ ...state, loading: false, error: null })
  ),
  on(roomPageLockFailAction,
    (state, { error }): AppState => ({ ...state, loading: false, error })
  ),
  on(roomPageLeaveConfirmedAction,
    (state): AppState => ({ ...state, loading: true })
  ),
  on(roomPageLeaveFailAction,
    (_, { error }): AppState => ({ ...initialAppState, error })
  ),
  on(roomPageClearVotesClickedAction,
    (state): AppState => ({ ...state, loading: true })
  ),
  on(roomPageClearVotesSuccessAction,
    (state): AppState => ({ ...state, loading: false, votingLocked: false })
  ),
  on(roomPageClearVotesFailAction,
    (state, { error }): AppState => ({ ...state, loading: false, error })
  ),
  on(roomPageVotersLoadedSuccessAction,
    (state, { voters }): AppState => ({ ...state, loading: false, voters, error: null })
  ),
  on(roomPageVotersLoadedFailAction,
    (state, { error }): AppState => ({ ...state, loading: false, error })
  ),
  on(roomPageSetMyInformationAction,
    (state, { myInformation }): AppState => ({ ...state, myInformation, votingLocked: myInformation.room.locked })
  ),
  on(roomPageChangeRoleClickedAction,
    (state): AppState => ({ ...state, loading: true })
  ),
  on(roomPageChangeRoleSuccessAction,
    (state, { updatedRole }): AppState => ({
      ...state,
      myInformation: {
        ...state.myInformation,
        role: updatedRole as RoleType
      },
      loading: false, error: null
    })
  ),
  on(roomPageChangeRoleFailAction,
    (state, { error }): AppState => ({ ...state, loading: false, error })
  ),
  on(roomPageChangeRoomItemsClickedAction,
    (state): AppState => ({ ...state, loading: true })
  ),
  on(roomPageChangeRoomItemsSuccessAction,
    (state): AppState => ({ ...state, loading: false, error: null })
  ),
  on(roomPageChangeRoomItemsFailAction,
    (state, { error }): AppState => ({ ...state, loading: false, error }),
  ),

  /**
   * Signal r related
   */
  on(signalRConnectionSuccessAction,
    (state): AppState => ({ ...state, signalRConnected: true, error: null })
  ),
  on(signalRConnectionFailAction,
    (state, { error }): AppState => ({ ...state, signalRConnected: false, error })
  ),
  on(signalRDisconnectionSuccessAction,
    (): AppState => (initialAppState)
  ),
  on(signalRVotingUpdatedAction,
    (state, { updatedVoters }): AppState => ({
      ...state,
      voters: updatedVoters,
      myInformation: {
        ...state.myInformation,
        room: updatedVoters[0].room
      }
    })
  ),
  on(signalRVotingLockedAction,
    (state): AppState => ({ ...state, votingLocked: true })
  ),
  on(signalRVotingUnlockedAction,
    (state): AppState => ({ ...state, votingLocked: false })
  ),

  /**
   * Guard actions
   */
  on(roomGuardReconnectVoterRequestAction,
    (state): AppState => ({ ...state, loading: true })
  ),
  on(roomGuardReconnectVoterSuccessAction,
    (state, { voter }): AppState => ({
      ...state,
      loading: false,
      myInformation: voter,
      error: null,
      room: voter.room,
      votingLocked: voter.room.locked
    })
  ),
  on(roomGuardReconnectVoterFailAction,
    (state, { error }): AppState => ({ ...state, loading: false, error })
  ),
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
