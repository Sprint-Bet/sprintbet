import { RoleType } from '../enums/role-type.enum';

export interface NewVoter {
    name: string;
    role: RoleType;
    group: string;
}
