import { VotesAreMatching } from './votes-are-matching.pipe';

describe('EveryonesVotesMatchPipe', () => {
  it('create an instance', () => {
    const pipe = new VotesAreMatching();
    expect(pipe).toBeTruthy();
  });
});
