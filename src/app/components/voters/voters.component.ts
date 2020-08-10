import { Component, OnInit, Input } from '@angular/core';
import { Voter } from '@src/app/model/dtos/voter';
import { RoleType } from '@src/app/enums/role-type.enum';
import { Room } from '@src/app/model/dtos/room';

interface MemberTypes {
  'Participants': boolean,
  'Spectators': boolean
} 

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {
  @Input() votingLocked: boolean;
  @Input() myInformation: Voter;
  @Input() voters: Voter[];
  @Input() room: Room;

  get spectators(): Voter[] {
    return !!this.voters && this.voters.filter(voter => +voter.role === +RoleType.SPECTATOR);
  }

  get participants(): Voter[] {
    return !!this.voters && this.voters.filter(voter => +voter.role === +RoleType.PARTICIPANT);
  }

  showMembers: MemberTypes = {
    Participants: true,
    Spectators: false,
  };

  constructor() { }

  ngOnInit() {
  }

}
