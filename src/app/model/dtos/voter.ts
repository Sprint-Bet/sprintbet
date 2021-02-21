import { RoleType } from '../../enums/role-type.enum';
import { Room } from './room';

export interface Voter {
  name: string;
  id: string;
  role: RoleType;
  point: string;
  room: Room;
}
