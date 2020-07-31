import { RoleType } from '../../enums/role-type.enum';
import { ItemType } from '@src/app/enums/item-type.enum';

export interface NewVoter {
    name: string;
    role: RoleType;
    group: string;
    itemsType?: ItemType;
}
