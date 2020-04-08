import { Vote } from './vote';

export interface Voter {
  [id: string]: Vote;
}
