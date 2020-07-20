import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '@src/app/state/app.state';
import { Store, Action } from '@ngrx/store';
import { roomPageLockClickedAction, roomPageClearVotesClickedAction } from '@src/app/state/app.actions';
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

  @Input()
  set myInformation(myInformation: Voter) {
    this._myInformation = myInformation;
    this.isPlayer = +myInformation.role === +RoleType.PARTICIPANT;
  }
  get myInformation(): Voter {
    return this._myInformation;
  }

  private _myInformation: Voter;
  isPlayer = false;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

  updateLockStatus() {
    this.votingLocked
      ? this.clearVotes()
      : this.lockVoting();
  }

  lockVoting() {
    const participants = this.voters.filter(voter => +voter.role === +RoleType.PARTICIPANT);
    const participantsCount = participants.length;
    const votersWithVoteCast = participants.filter(voter => !!voter.point).length;
    const revealText = `${votersWithVoteCast}/${participantsCount} participants have voted. Lock and reveal votes?`;
    this.confirmAction(revealText, roomPageLockClickedAction());
  }

  clearVotes() {
    this.confirmAction('Reset all votes?', roomPageClearVotesClickedAction());
  }

  confirmAction(message: string, action: Action) {
    if (confirm(message)) {
      this.store.dispatch(action);
    }
  }

  public copyUrlToClipboard(): void {
    navigator.clipboard.writeText(window.location.href);
    alert("Copied url to clipboard!");
  }
}
