import { RoleType } from '../../enums/role-type.enum';
import { ItemsType } from 'src/app/enums/items-type.enum';

export interface NewVoter {
    name: string;
    role: RoleType;
    group: string;
    itemsType: ItemsType;
}
