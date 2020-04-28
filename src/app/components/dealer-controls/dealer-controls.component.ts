import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '@src/app/state/app.state';
import { Store } from '@ngrx/store';
import { roomPageLockClickedAction, roomPageClearVotesClickedAction, roomPageFinishClickedAction } from '@src/app/state/app.actions';
import { Voter } from '@src/app/model/dtos/voter';
import { RoleType } from '@src/app/enums/role-type.enum';

@Component({
  selector: 'app-dealer-controls',
  templateUrl: './dealer-controls.component.html',
  styleUrls: ['./dealer-controls.component.scss']
})
export class DealerControlsComponent implements OnInit {
  @Input() voters: Voter[];
  @Input() votingLocked: boolean;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

  lockVoting() {
    const haventAllVoted = this.voters
      .filter(v => +v.role === +RoleType.PARTICIPANT)
      .some(voter => !voter.point);

    if (haventAllVoted) {
      alert('Not all participants have casted a vote!');
      return;
    }

    if (confirm('Lock and reveal votes?')) {
      this.store.dispatch(roomPageLockClickedAction());
    }
  }

  clearVotes() {
    if (confirm('Reset all votes?')) {
      this.store.dispatch(roomPageClearVotesClickedAction());
    }
  }

  finishGame() {
    if (confirm('End the game?')) {
      this.store.dispatch(roomPageFinishClickedAction());
    }
  }
}
