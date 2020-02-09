import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voting-cards',
  templateUrl: './voting-cards.component.html',
  styleUrls: ['./voting-cards.component.scss']
})
export class VotingCardsComponent implements OnInit {
  tshirtSizes = ['XS', 'S', 'M', 'L', 'XL'];
  fibonacci = ['1', '2', '3', '5', '8'];
  selectedValue: string;
  locked = true;

  constructor() { }

  ngOnInit() {
  }

}
