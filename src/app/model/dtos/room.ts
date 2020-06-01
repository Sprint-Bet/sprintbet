export interface Room {
    id: string;
    dealerId: string;
    votingLocked: boolean;
    items?: string[];
}
