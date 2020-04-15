import { Component, OnInit } from '@angular/core';
import { AppState } from '@src/app/state/app.state';
import { Store } from '@ngrx/store';
import { roomPageLeaveConfirmedAction } from '@src/app/state/app.actions';

@Component({
  selector: 'app-room-controls',
  templateUrl: './room-controls.component.html',
  styleUrls: ['./room-controls.component.scss']
})
export class RoomControlsComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  leaveRoom() {
    if (confirm('Leave room?')) {
      this.store.dispatch(roomPageLeaveConfirmedAction());
    }
  }
}
