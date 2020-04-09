import { AppState } from './app.state';
import { Action, createReducer, on } from '@ngrx/store';
import { intitialAppState } from './app.state';
import { votersLoadedSuccessAction, votersLoadedFailAction, roomPageNavigatedAction } from './app.actions';


const appReducer = createReducer(
    intitialAppState,
    on(roomPageNavigatedAction,
        (state): AppState => ({ ...state, loading: true })
    ),
    on(votersLoadedSuccessAction,
        (state, { voters }): AppState => ({ ...state, loading: false, voters })
    ),
    on(votersLoadedFailAction,
        (state, { error }): AppState => ({ ...state, loading: false, error })
    ),
);

export function reducer(state: AppState | undefined, action: Action) {
    return appReducer(state, action);
}
