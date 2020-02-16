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
  votingLocked$ = of(false);

  initialVoters$ = this.voteService.setupVoter(this.name);
  voterAdded$ = this.voteService.listenFor<NewVoter>(HubEvents.VoterAdded);
  voterLeft$ = this.voteService.listenFor<string>(HubEvents.VoterLeft);
  voters$ = combineLatest([
    this.initialVoters$,
    this.voterAdded$.pipe(startWith(null)),
    this.voterLeft$.pipe(startWith(null)),
  ]).pipe(
    map(([voters, newVoter, departedVoterId]) => {
      let updatedVoters = voters;

      const initialLoad = newVoter == null && departedVoterId == null;
      if (initialLoad) {
        return voters;
      }

      const shouldAddVoter = newVoter && newVoter.id && !voters[newVoter.id];
      if (shouldAddVoter) {
        updatedVoters[newVoter.id] = { name: newVoter.name, point: '' }
      }

      if (departedVoterId) {
        delete updatedVoters[departedVoterId];
      }

      return updatedVoters;
    }),
  )

  newVote$ = this.voteService.listenFor<NewVote>(HubEvents.VoteUpdated);

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() { }

}
