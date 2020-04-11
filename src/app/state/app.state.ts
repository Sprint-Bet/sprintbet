import { HttpErrorResponse } from '@angular/common/http';
import { Voter } from '../model/dtos/voter';
import { RoleType } from '../model/enums/role-type.enum';

export interface AppState {
    votingLocked: boolean;
    voters: Voter[];
    loading: boolean;
    error: HttpErrorResponse;
    role: RoleType;
    sessionId: string;
}

export const intitialAppState: AppState = {
    votingLocked: false,
    voters: null,
    loading: false,
    error: null,
    role: null,
    sessionId: null,
};
