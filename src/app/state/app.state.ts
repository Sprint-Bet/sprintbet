import { HttpErrorResponse } from '@angular/common/http';
import { Voter } from '../model/dtos/voter';
import { Room } from '../model/dtos/room';
import { NewVoter } from '../model/dtos/new-voter';

export interface AppState {
    votingLocked: boolean;
    voters: Voter[];
    loading: boolean;
    error: HttpErrorResponse;
    registrationInfo: NewVoter;
    myInformation: Voter;
    sessionId: string;
    room: Room;
}

export const initialAppState: AppState = {
    votingLocked: false,
    voters: null,
    loading: false,
    error: null,
    registrationInfo: null,
    myInformation: null,
    sessionId: null,
    room: null,
};
