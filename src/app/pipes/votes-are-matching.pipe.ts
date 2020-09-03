import { Pipe, PipeTransform } from '@angular/core';
import { Voter } from '../model/dtos/voter';

@Pipe({
  name: 'votesAreMatching'
})
export class VotesAreMatching implements PipeTransform {

  transform(participants: Voter[]): boolean {
    if (!participants || participants.length < 2 || !participants[0].point) {
      return false;
    }

    return participants.every((participant, _, array) => participant.point === array[0].point);
  }

}
