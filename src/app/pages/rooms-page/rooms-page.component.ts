import { Component, OnInit } from '@angular/core';
import { VoteService } from '@src/app/services/vote.service';
import { Vote } from '@src/app/model/dtos/vote';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  vote$: Observable<Vote> = this.voteService.listenFor<Vote>('BroadcastVote');

  constructor(
    private voteService: VoteService,
  ) { }

  ngOnInit() {
  }

}
