import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {
  @Input() votingLocked: boolean;
  @Input() voters: { Voter };
  @Input() initialVoters: { Voter };

  constructor() { }

  ngOnInit() {
  }

}
