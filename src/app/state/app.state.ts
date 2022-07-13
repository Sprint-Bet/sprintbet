import { Voter } from '../model/dtos/voter';
import { Room } from '../model/dtos/room';
import { NewVoter } from '../model/dtos/new-voter';
import { RoleType } from '../enums/role-type.enum';
import { ItemsType } from '../enums/items-type.enum';

const initialRegistrationInfo: NewVoter = {
  name: '',
  role: RoleType.PARTICIPANT,
  group: '',
  itemsType: ItemsType.FIBONACCI,
};

const initialRoom: Room = {
  id: '',
  name: '',
  dealerId: '',
  locked: false,
  items: []
};

export const InitialMyInformation: Voter = {
  name: '',
  id: '',
  role: RoleType.PARTICIPANT,
  point: '',
  room: initialRoom
};

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
  votingLocked: false,
  voters: [],
  loading: false,
  error: null,
  registrationInfo: initialRegistrationInfo,
  myInformation: InitialMyInformation,
  sessionId: '',
  room: initialRoom,
  signalRConnected: false
};
