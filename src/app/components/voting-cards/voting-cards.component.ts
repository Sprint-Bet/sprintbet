import { Component, OnInit, Input } from '@angular/core';
import { VoteService } from '@src/app/services/vote.service';
import { ActivatedRoute } from '@angular/router';
import { HubMethods } from '@src/app/model/enums/hubMethods.enum';
import { Vote } from '@src/app/model/dtos/vote';

@Component({
  selector: 'app-voting-cards',
  templateUrl: './voting-cards.component.html',
  styleUrls: ['./voting-cards.component.scss']
})
export class VotingCardsComponent implements OnInit {
  @Input() locked: boolean;

  private name = this.route.snapshot.queryParams.name;

  tshirtSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '?'];
  fibonacci = ['1', '2', '3', '5', '8', '13', '20', '?'];
  selectedValue: string;

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  clicked(value: string) {
    this.selectedValue = value;
    const vote = {name: this.name, point: value} as Vote;
    this.voteService.send(HubMethods.UpdateVote, vote);
  }

}
