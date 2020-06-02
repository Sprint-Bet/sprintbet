import { Component, OnInit, Input } from '@angular/core';
import { Voter } from '@src/app/model/dtos/voter';
import { RoleType } from '@src/app/enums/role-type.enum';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {
  @Input() votingLocked: boolean;
  @Input() myInformation: Voter;
  @Input() voters: Voter[];

  get spectators(): Voter[] {
    return this.voters.filter(voter => +voter.role === +RoleType.SPECTATOR);
  }

  get participants(): Voter[] {
    return this.voters.filter(voter => +voter.role === +RoleType.PARTICIPANT);
  }

  showSpectators = false;
  showParticipants = true;

  constructor() { }

  ngOnInit() {
  }

}
