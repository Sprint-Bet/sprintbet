import { Component, OnInit, Input } from '@angular/core';
import { AppState, InitialMyInformation } from 'src/app/state/app.state';
import { Store, Action } from '@ngrx/store';
import { roomPageLeaveConfirmedAction, roomPageChangeRoleClickedAction, roomPageFinishClickedAction } from 'src/app/state/app.actions';
import { Voter } from 'src/app/model/dtos/voter';
import { RoleType } from 'src/app/enums/role-type.enum';

@Component({
  selector: 'app-room-controls',
  templateUrl: './room-controls.component.html',
  styleUrls: ['./room-controls.component.scss']
})
export class RoomControlsComponent implements OnInit {
  @Input() isDealer = false;

  @Input()
  set myInformation(myInformation: Voter) {
    if (!myInformation) { return; }

    this._myInformation = myInformation;
    this.isPlayer = +myInformation.role === +RoleType.PARTICIPANT;
  }
  get myInformation(): Voter {
    return this._myInformation;
  }

  private _myInformation: Voter = InitialMyInformation;
  isPlayer = true;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  quitRoom() {
    this.isDealer
      ? this.confirmAction('End the game?', roomPageFinishClickedAction())
      : this.confirmAction('Leave room?', roomPageLeaveConfirmedAction({ sessionId: this?.myInformation?.id }));
  }

  updateRole() {
    this.isPlayer
      ? this.store.dispatch(roomPageChangeRoleClickedAction({ voterId: this?.myInformation?.id, role: RoleType.SPECTATOR }))
      : this.store.dispatch(roomPageChangeRoleClickedAction({ voterId: this?.myInformation?.id, role: RoleType.PARTICIPANT }));
  }

  /**
   * Utility method to confirm before carrying out an action
   * This method would ideally be shared!
   * @param message Message to display in alert confirm box
   * @param action NGRX store action to dispatch on confirmation
   */
  confirmAction(message: string, action: Action) {
    if (confirm(message)) {
      this.store.dispatch(action);
    }
  }
}
