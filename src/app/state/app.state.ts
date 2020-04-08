export interface AppState {
    votingLocked: boolean;
    voters: { Voter };
}

export const intitialState = {
    votingLocked: false,
    voters: {},
};
