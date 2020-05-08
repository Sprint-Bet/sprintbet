import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '@src/app/state/app.state';
import { Store, Action } from '@ngrx/store';
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
      .filter(voter => +voter.role === +RoleType.PARTICIPANT)
      .some(voter => !voter.point);

    if (haventAllVoted) {
      alert('Not all participants have casted a vote!');
      return;
    }

    this.confirmAction('Lock and reveal votes?', roomPageLockClickedAction());
  }

  clearVotes() {
    this.confirmAction('Reset all votes?', roomPageClearVotesClickedAction());
  }

  finishGame() {
    this.confirmAction('End the game?', roomPageFinishClickedAction());
  }

  confirmAction(message: string, action: Action) {
    if (confirm(message)) {
      this.store.dispatch(action);
    }
  }
}
