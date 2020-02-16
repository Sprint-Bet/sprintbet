import { Component, OnInit } from '@angular/core';
import { VoteService } from '@src/app/services/vote.service';
import { of, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NewVoter } from '@src/app/model/dtos/new-voter';
import { NewVote } from '@src/app/model/dtos/new-vote';
import { HubEvents } from '@src/app/model/enums/hubEvents.enum';
import { map, tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  name = this.route.snapshot.queryParams.name;

  initialVoters$ = this.voteService.setupVoter(this.name);
  newVoter$ = this.voteService.listenFor<NewVoter>(HubEvents.VoterAdded);
  voters$ = combineLatest([
    this.initialVoters$,
    this.newVoter$.pipe(startWith(null)),
  ]).pipe(
    map(([voters, newVoter]) => {
      if (newVoter == null) {
        return voters;
      }
      return !voters[newVoter.id]
        ? voters[newVoter.id] = { name: newVoter.name, point: '' }
        : voters;
    }),
  )

  newVote$ = this.voteService.listenFor<NewVote>(HubEvents.VoteUpdated);

  locked$ = of(false);

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() { }

}
