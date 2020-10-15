import { Voter } from './voter';

export interface NewVoterResponse {
    token: string,
    voter: Voter
}