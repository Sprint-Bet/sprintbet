import { AppState } from './app.state';
import { Action, createReducer, on } from '@ngrx/store';
import { intitialAppState } from './app.state';
import { votersLoadedSuccessAction,
    votersLoadedFailAction,
    roomPageNavigatedAction,
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
    roomPageLeaveSuccessAction,
    roomPageLeaveFailAction,
    storedIdNotFoundInStateAction,
    signalRVotingUpdatedAction,
    signalRVotingLockedAction,
    signalRVotingUnlockedAction,
} from './app.actions';


const appReducer = createReducer(
    intitialAppState,
    on(welcomePageJoinRoomClickedAction,
        (state, { registrationInfo }): AppState => ({ ...state, loading: true, role: registrationInfo.role })
    ),
    on(welcomePageJoinRoomSuccessAction, storedIdNotFoundInStateAction,
        (state, { sessionId }): AppState => ({ ...state, loading: false, sessionId, error: null })
    ),
    on(welcomePageJoinRoomFailAction,
        (state, { error }): AppState => ({ ...state, loading: false, error })
    ),
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
    on(roomPageLeaveSuccessAction,
        (): AppState => (intitialAppState)
    ),
    on(roomPageLeaveFailAction,
        (state, { error }): AppState => ({ ...state, loading: false, error })
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
    on(votersLoadedSuccessAction,
        (state, { voters }): AppState => ({ ...state, loading: false, voters, error: null })
    ),
    on(votersLoadedFailAction,
        (state, { error }): AppState => ({ ...state, loading: false, error })
    ),
    on(signalRVotingUpdatedAction,
        (state, { updatedVoters }): AppState => ({ ...state, voters: updatedVoters })
    ),
    on(signalRVotingLockedAction,
        (state): AppState => ({ ...state, votingLocked: true })
    ),
    on(signalRVotingUnlockedAction,
        (state): AppState => ({ ...state, votingLocked: false })
    ),
);

export function reducer(state: AppState | undefined, action: Action) {
    return appReducer(state, action);
}
