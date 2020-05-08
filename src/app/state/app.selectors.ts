import { createSelector, createFeatureSelector } from '@ngrx/store';
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

export const votingLockedSelector = createSelector(
    appStateSelector,
    state => state.votingLocked
);

export const myInformationSelector = createSelector(
    appStateSelector,
    state => state.myInformation
);

export const roomSelector = createSelector(
    appStateSelector,
    state => state.room
);

export const registrationInfoSelector = createSelector(
  appStateSelector,
  state => state.registrationInfo
);

export const signalRConnectedSelector = createSelector(
  appStateSelector,
  state => state.signalRConnected
);

export const errorSelector = createSelector(
  appStateSelector,
  state => state.error
);
