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
