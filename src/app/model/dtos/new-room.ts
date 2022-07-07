import { ItemsType } from "@src/app/enums/items-type.enum";

export interface NewRoom {
  itemsType: ItemsType;
  name?: string;
};
