import { Component, OnInit } from '@angular/core';
import { VoteService } from '@src/app/services/vote.service';
import { Vote } from '@src/app/model/dtos/vote';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  vote$: Observable<Vote> = this.voteService.listenFor<Vote>('BroadcastVote');
  voters$: Observable<{ Voter }>;
  locked$ = of(false);

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
  ) {
    const name = this.route.snapshot.queryParams.name;
    this.voters$ = this.voteService.setupVoter(name);
  }

  ngOnInit() {
  }

}
