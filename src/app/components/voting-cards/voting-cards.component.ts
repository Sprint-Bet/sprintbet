import { Component, OnInit, Input } from '@angular/core';
import { VoteService } from '@src/app/services/vote.service';

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
    private voteService: VoteService,
  ) { }

  ngOnInit() {
  }

  clicked(value: string) {
    this.selectedValue = value;
  }

}
