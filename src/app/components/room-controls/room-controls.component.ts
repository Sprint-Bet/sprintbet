import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '@src/app/state/app.state';
import { Store } from '@ngrx/store';
import { roomPageLeaveConfirmedAction } from '@src/app/state/app.actions';
import { Voter } from '@src/app/model/dtos/voter';

@Component({
  selector: 'app-room-controls',
  templateUrl: './room-controls.component.html',
  styleUrls: ['./room-controls.component.scss']
})
export class RoomControlsComponent implements OnInit {
  @Input() myInformation: Voter;

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
}
