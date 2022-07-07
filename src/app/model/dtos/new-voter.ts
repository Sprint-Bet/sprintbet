import { RoleType } from '../../enums/role-type.enum';
import { ItemsType } from 'src/app/enums/items-type.enum';

export interface NewVoter {
    name: string;
    roomName?: string;
    role: RoleType;
    group: string;
    itemsType: ItemsType;
}
