import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { roomPageNavigatedAction } from '@src/app/state/app.actions';
import { votersSelector } from '@src/app/state/app.selectors';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  name = this.route.snapshot.queryParams.name;
  votingLocked$ = of(false);

  // initialVoters$ = this.voteService.setupVoter(this.name);
  // voterAdded$ = this.voteService.listenFor<NewVoter>(HubEvents.VoterAdded);
  // voterLeft$ = this.voteService.listenFor<string>(HubEvents.VoterLeft);
  // voters$ = combineLatest([
  //   this.initialVoters$,
  //   this.voterAdded$.pipe(startWith(null)),
  //   this.voterLeft$.pipe(startWith(null)),
  // ]).pipe(
  //   map(([voters, newVoter, departedVoterId]) => {
  //     let updatedVoters = voters;

  //     const initialLoad = newVoter == null && departedVoterId == null;
  //     if (initialLoad) {
  //       return voters;
  //     }

  //     const shouldAddVoter = newVoter && newVoter.id && !voters[newVoter.id];
  //     if (shouldAddVoter) {
  //       updatedVoters[newVoter.id] = { name: newVoter.name, point: '' };
  //     }

  //     if (departedVoterId) {
  //       delete updatedVoters[departedVoterId];
  //     }

  //     return updatedVoters;
  //   }),
  // );

  // newVote$ = this.voteService.listenFor<NewVote>(HubEvents.VoteUpdated);

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  voters$ = this.store.pipe(select(votersSelector));

  ngOnInit() {
    this.store.dispatch(roomPageNavigatedAction({ newVoterName: this.name }));

    // TODO: Make setup voter endpoint store and then return sessionId (guid)
    // TODO: Add sessionId guard on the welcome page ('leave room' wipes sessionId and routes to welcome)
    // TODO: Add 'room name' field to the form
    // TODO: Add 'room name' capability to the API
    // TODO: Change the room route to include room name
    // TODO: Add 'role' information to the form, and API dto
    // TODO: Store the 'role' in state store
    // TODO: Add 'dealer' functionality to the frontend
    // TODO: Add 'dealer' functionality to the API (might require auth)
  }

}
