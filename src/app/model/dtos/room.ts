export interface Room {
    id: string;
    name?: string;
    dealerId: string;
    locked: boolean;
    items: string[];
}
