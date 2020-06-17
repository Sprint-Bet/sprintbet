import { Voter } from '../model/dtos/voter';
import { Room } from '../model/dtos/room';
import { NewVoter } from '../model/dtos/new-voter';

export interface AppState {
  votingLocked: boolean;
  voters: Voter[];
  loading: boolean;
  error: any;
  registrationInfo: NewVoter;
  myInformation: Voter;
  sessionId: string;
  room: Room;
  signalRConnected: boolean;
}

export const initialAppState: AppState = {
  votingLocked: null,
  voters: null,
  loading: false,
  error: null,
  registrationInfo: null,
  myInformation: null,
  sessionId: null,
  room: null,
  signalRConnected: false
};
