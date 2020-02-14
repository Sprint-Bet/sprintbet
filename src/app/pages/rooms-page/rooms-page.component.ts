import { Component, OnInit } from '@angular/core';
import { VoteService } from '@src/app/services/vote.service';
import { of, forkJoin, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HubMethods } from '@src/app/model/dtos/enums/hubMethods.enum';
import { NewVoter } from '@src/app/model/dtos/newVoter';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  private name = this.route.snapshot.queryParams.name;

  voters$ = this.voteService.setupVoter(this.name);
  newVoter$ = this.voteService.listenFor<NewVoter>(HubMethods.VoterAdded);

  locked$ = of(false);

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    combineLatest(this.voters$, this.newVoter$).subscribe(vals => {
      console.log('blahhh');
      console.log(vals);
    });
  }

}
