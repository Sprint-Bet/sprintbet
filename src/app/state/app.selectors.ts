import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from './app.state';

export const appStateSelector = createFeatureSelector<AppState>('appState');

export const votersSelector = createSelector(
    appStateSelector,
    state => state.voters
);

export const loadingSelector = createSelector(
    appStateSelector,
    state => state.loading
);

export const sessionIdSelector = createSelector(
    appStateSelector,
    state => state.sessionId
);

export const roleSelector = createSelector(
    appStateSelector,
    state => state.role
);

export const votingLockedSelector = createSelector(
    appStateSelector,
    state => state.votingLocked
);
