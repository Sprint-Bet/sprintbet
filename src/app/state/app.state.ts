import { HttpErrorResponse } from '@angular/common/http';
import { Voter } from '../model/dtos/voter';
import { Room } from '../model/dtos/room';

export interface AppState {
    votingLocked: boolean;
    voters: Voter[];
    loading: boolean;
    error: HttpErrorResponse;
    myInformation: Voter;
    sessionId: string;
    room: Room;
}

export const initialAppState: AppState = {
    votingLocked: false,
    voters: null,
    loading: false,
    error: null,
    myInformation: null,
    sessionId: null,
    room: null,
};
