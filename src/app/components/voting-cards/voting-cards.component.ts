import { Component, OnInit, Input } from '@angular/core';
import { Vote } from '@src/app/model/dtos/vote';
import { Store } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { roomPageVoteClickedAction } from '@src/app/state/app.actions';

@Component({
  selector: 'app-voting-cards',
  templateUrl: './voting-cards.component.html',
  styleUrls: ['./voting-cards.component.scss']
})
export class VotingCardsComponent implements OnInit {
  @Input() locked: boolean;

  tshirtSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '?'];
  fibonacci = ['1', '2', '3', '5', '8', '13', '20', '?'];
  selectedValue: string;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  clicked(value: string) {
    this.selectedValue = value;
    const vote = { point: value } as Vote;
    this.store.dispatch(roomPageVoteClickedAction({ vote }));
  }

}
