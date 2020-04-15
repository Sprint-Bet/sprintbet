import { RoleType } from '../../enums/role-type.enum';

export interface Voter {
  name: string;
  id: string;
  role: RoleType;
  point: string;
}
