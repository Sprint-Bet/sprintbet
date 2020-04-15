import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { roomPageNavigatedAction } from '@src/app/state/app.actions';
import { votersSelector, sessionIdSelector, roleSelector } from '@src/app/state/app.selectors';
import { map, tap } from 'rxjs/operators';
import { RoleType } from '@src/app/enums/role-type.enum';

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

    // DONE
    // DONE: Make setup voter endpoint store and then return sessionId (guid)
    // DONE: Add 'room name' field to the form
    // DONE: Add 'role' information to the form, and API dto
    // DONE: Store the 'role' in state store
    // DONE: Once getVoters() is complete, listen for updates using signalR
    // DONE: Move getVoters() to controller
    // DONE: Display which voter is you!
    // DONE: Display separate role controls on frontend
    // DONE: Add sessionId to local storage when retrieved from vote-service
    // DONE: leave room should wipe sessionId and routes to welcome

    // TODO
    // TODO: Add generic <T> functions to support connection.on() in vote-hub service
    // TODO: Add room guard (checks state for sessionId, then local storage, redirects if neither)
    // TODO: In room guard check whether the sessionId token is valid (i.e. the sessionId you have is for the right room)
    // TODO: Add 'room name' capability to the API
    // TODO: Change the room route to include room name
    // TODO: Call getVoters() by passing in sessionId as Bearer token
  }

}
