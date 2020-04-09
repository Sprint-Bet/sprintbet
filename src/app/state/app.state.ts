import { HttpErrorResponse } from '@angular/common/http';

export interface AppState {
    votingLocked: boolean;
    voters: { Voter };
    loading: boolean;
    error: HttpErrorResponse;
}

export const intitialAppState: AppState = {
    votingLocked: false,
    voters: null,
    loading: false,
    error: null,
};
