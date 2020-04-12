import { AppState } from './app.state';
import { Action, createReducer, on } from '@ngrx/store';
import { intitialAppState } from './app.state';
import {
    votersLoadedSuccessAction,
    votersLoadedFailAction,
    roomPageNavigatedAction,
    welcomePageJoinRoomClickedAction,
    welcomePageJoinRoomSuccessAction,
    welcomePageJoinRoomFailAction,
    signalRVotingUpdatedAction
} from './app.actions';


const appReducer = createReducer(
    intitialAppState,
    on(welcomePageJoinRoomClickedAction,
        (state, { registrationInfo }): AppState => ({ ...state, loading: true, role: registrationInfo.role })
    ),
    on(welcomePageJoinRoomSuccessAction,
        (state, { sessionId }): AppState => ({ ...state, loading: false, sessionId })
    ),
    on(welcomePageJoinRoomFailAction,
        (state, { error }): AppState => ({ ...state, loading: false, error })
    ),
    on(roomPageNavigatedAction,
        (state): AppState => ({ ...state, loading: true })
    ),
    on(votersLoadedSuccessAction,
        (state, { voters }): AppState => ({ ...state, loading: false, voters })
    ),
    on(votersLoadedFailAction,
        (state, { error }): AppState => ({ ...state, loading: false, error })
    ),
    on(signalRVotingUpdatedAction,
        (state, { updatedVoters }): AppState => ({ ...state, voters: updatedVoters })
    )
);

export function reducer(state: AppState | undefined, action: Action) {
    return appReducer(state, action);
}
