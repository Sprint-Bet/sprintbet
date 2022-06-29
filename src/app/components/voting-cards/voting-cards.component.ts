import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Vote } from 'src/app/model/dtos/vote';
import { Store } from '@ngrx/store';
import { AppState, InitialMyInformation } from 'src/app/state/app.state';
import { roomPageVoteClickedAction } from 'src/app/state/app.actions';
import { Voter } from 'src/app/model/dtos/voter';

@Component({
  selector: 'app-voting-cards',
  templateUrl: './voting-cards.component.html',
  styleUrls: ['./voting-cards.component.scss']
})
export class VotingCardsComponent implements OnInit {
  private _myInformation: Voter = InitialMyInformation;
  private _locked = false;

  @Input()
  set myInformation(myInfo: Voter) {
    if (!myInfo) { return; }

    this._myInformation = myInfo;
    this.items = myInfo.room.items;

    if (myInfo?.point) { this.selectedValue = myInfo.point; }
  }

  get myInformation(): Voter {
    return this._myInformation;
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

  items: string[]  = [];
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

    const keySelection = Number.parseInt(event.key);
    const isSelectableOption = Number.isInteger(keySelection)
      && keySelection > 0
      && keySelection <= this.items.length;

    if (!isSelectableOption) {
      return;
    }

    const currentSelection = this.myInformation?.point;
    const newSelection = this.items[keySelection - 1];
    const valueToSend = currentSelection === newSelection ? '' : newSelection;

    this.sendVote(valueToSend);
  }

  private sendVote(selection: string) {
    const vote = { point: selection } as Vote;
    this.store.dispatch(roomPageVoteClickedAction({ vote }));
  }

}
