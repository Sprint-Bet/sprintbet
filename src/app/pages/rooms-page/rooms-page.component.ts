import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { roomPageNavigatedAction } from '@src/app/state/app.actions';
import { votersSelector, sessionIdSelector, roleSelector } from '@src/app/state/app.selectors';
import { map, tap } from 'rxjs/operators';
import { RoleType } from '@src/app/model/enums/role-type.enum';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  votingLocked$ = of(false);
  voters$ = this.store.pipe(select(votersSelector));
  sessionId$ = this.store.pipe(select(sessionIdSelector));
  isDealer$ = this.store.pipe(
    select(roleSelector),
    map(role => role === RoleType.DEALER),
  );
  isParticipant$ = this.store.pipe(
    select(roleSelector),
    map(role => role === RoleType.PARTICIPANT),
  );

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(roomPageNavigatedAction());

    // DONE: DONE
    // DONE: Make setup voter endpoint store and then return sessionId (guid)
    // DONE: Add 'room name' field to the form
    // DONE: Add 'role' information to the form, and API dto
    // DONE: Store the 'role' in state store
    // DONE: Once getVoters() is complete, listen for updates using signalR
    // DONE: Move getVoters() to controller
    // DONE: Display which voter is you!

    // TODO: PRIORITY
    // TODO: Call getVoters() by passing in sessionId as Bearer token

    // TODO: EXTRAS
    // TODO: Add sessionId guard on the welcome page ('leave room' wipes sessionId and routes to welcome)
    // TODO: Add 'room name' capability to the API
    // TODO: Change the room route to include room name
    // TODO: Add 'dealer' functionality to the frontend
  }

}
