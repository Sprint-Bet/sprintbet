import { Vote } from './vote';

export interface NewVote {
    connectionId: string;
    vote: Vote;
}
