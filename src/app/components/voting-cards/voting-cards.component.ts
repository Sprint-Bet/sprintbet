import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Vote } from '@src/app/model/dtos/vote';
import { Store } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { roomPageVoteClickedAction } from '@src/app/state/app.actions';
import { Voter } from '@src/app/model/dtos/voter';

@Component({
  selector: 'app-voting-cards',
  templateUrl: './voting-cards.component.html',
  styleUrls: ['./voting-cards.component.scss']
})
export class VotingCardsComponent implements OnInit {
  @Input()
  set myInformation(myInfo: Voter) {
    this.items = myInfo.room.items;
  }

  @Input()
  set locked(locked: boolean) {
    const unlocking = this._locked && !locked;
    unlocking && (this.selectedValue = '');

    this._locked = locked;
  }
  get locked(): boolean {
    return this._locked;
  }

  private _locked: boolean;
  items = [];
  selectedValue = '';

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  clicked(value: string) {
    this.selectedValue = value === this.selectedValue ? '' : value;
    this.sendVote(this.selectedValue);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.locked) {
      return;
    }

    const selection = Number.parseInt(event.key);
    
    const isSelectableOption = Number.isInteger(selection)
      && selection > 0
      && selection <= this.items.length;
    
    if (!isSelectableOption) {
      return;
    }

    this.sendVote(this.items[selection - 1]);
  }

  private sendVote(selection: string) {
    const vote = { point: selection } as Vote;
    this.store.dispatch(roomPageVoteClickedAction({ vote }));
  }

}
