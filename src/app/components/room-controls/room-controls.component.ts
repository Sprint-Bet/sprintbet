import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '@src/app/state/app.state';
import { Store } from '@ngrx/store';
import { roomPageLeaveConfirmedAction, roomPageChangeRoleClickedAction } from '@src/app/state/app.actions';
import { Voter } from '@src/app/model/dtos/voter';
import { RoleType } from '@src/app/enums/role-type.enum';

@Component({
  selector: 'app-room-controls',
  templateUrl: './room-controls.component.html',
  styleUrls: ['./room-controls.component.scss']
})
export class RoomControlsComponent implements OnInit {
  private _myInformation: Voter;
  isPlayer = true;

  @Input()
  set myInformation(myInformation: Voter) {
    this._myInformation = myInformation;
    this.isPlayer = +myInformation.role === +RoleType.PARTICIPANT;
  }

  get myInformation(): Voter {
    return this._myInformation;
  }

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  leaveRoom() {
    if (confirm('Leave room?')) {
      this.store.dispatch(roomPageLeaveConfirmedAction({ sessionId: this.myInformation.id }));
    }
  }

  updateRole() {
    this.isPlayer
      ? this.store.dispatch(roomPageChangeRoleClickedAction({ voterId: this.myInformation.id, role: RoleType.SPECTATOR }))
      : this.store.dispatch(roomPageChangeRoleClickedAction({ voterId: this.myInformation.id, role: RoleType.PARTICIPANT }));
  }
}
