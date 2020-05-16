import { Component, OnInit, Input } from '@angular/core';
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
  private _locked: boolean;

  @Input()
  set myInformation(myInfo: Voter) {
    this.selectedValue = myInfo.point;
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

  tshirtSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '?'];
  fibonacci = ['1', '2', '3', '5', '8', '13', '20', '?'];
  selectedValue = '';

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  clicked(value: string) {
    this.selectedValue = value === this.selectedValue ? '' : value;
    const vote = { point: this.selectedValue } as Vote;
    this.store.dispatch(roomPageVoteClickedAction({ vote }));
  }

}
