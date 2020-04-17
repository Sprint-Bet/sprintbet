import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '@src/app/state/app.state';
import { Store } from '@ngrx/store';
import { roomPageLockClickedAction, roomPageClearVotesClickedAction } from '@src/app/state/app.actions';
import { Voter } from '@src/app/model/dtos/voter';

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
    if (this.voters.some(voter => !voter.point)) {
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
}
