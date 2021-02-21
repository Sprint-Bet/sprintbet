import { Component, OnInit, Input } from '@angular/core';
import { Voter } from 'src/app/model/dtos/voter';
import { RoleType } from 'src/app/enums/role-type.enum';
import { Room } from 'src/app/model/dtos/room';
import { InitialMyInformation } from 'src/app/state/app.state';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {
  @Input() votingLocked = false;
  @Input() myInformation: Voter = InitialMyInformation;
  @Input() voters: Voter[] = [];
  @Input() room: Room = InitialMyInformation.room;

  get spectators(): Voter[] {
    return !!this.voters && this.voters.filter(voter => +voter?.role === +RoleType.SPECTATOR);
  }

  get participants(): Voter[] {
    return !!this.voters && this.voters.filter(voter => +voter?.role === +RoleType.PARTICIPANT);
  }

  showMembers: any = {
    Participants: true,
    Spectators: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
