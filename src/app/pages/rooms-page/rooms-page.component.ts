import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { roomPageNavigatedAction } from '@src/app/state/app.actions';
import { votersSelector, votingLockedSelector, myInformationSelector } from '@src/app/state/app.selectors';
import { map, filter } from 'rxjs/operators';
import { RoleType } from '@src/app/enums/role-type.enum';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  votingLocked$ = this.store.pipe(select(votingLockedSelector));
  voters$ = this.store.pipe(select(votersSelector));

  myInformation$ = this.store.pipe(
    select(myInformationSelector),
    filter(myInformation => !!myInformation),
  );

  isDealer$ = this.myInformation$.pipe(
    map(myInformation => +myInformation.role === +RoleType.DEALER),
  );

  isParticipant$ = this.myInformation$.pipe(
    map(myInformation => +myInformation.role === +RoleType.PARTICIPANT),
  );

  constructor(
    private store: Store<AppState>,
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
    // DONE: leave room should remove the voter from the room via the API
    // DONE: leave room should wipe sessionId and routes to welcome
    // DONE: Add room guard (checks state for sessionId, then local storage, redirects if neither)
    // DONE: Add welcome guard (checks state for sessionId, then local storage, redirects if found)
    // DONE: In room/welcome guard check (with api?) create action/reducer to set sessionId if found only in local storage
    // DONE: Add generic <T> functions to support connection.on() in vote-hub service
    // DONE: Add dealer locking controls
    // DONE: Return all voters
    // DONE: Style the voting card correctly (when revealed)
    // DONE: Once allVotersLoadedSucess, get the voter matching sessionId, set those details in the state
    // DONE: Need to account for other role/room state information etc in the matchStateIdToStoredId method

    // TODO
    // TODO: Bug (null voter id) when part partipant leaves group
    // TODO: Add a roomService to api, check whether a room with that name exists before creating
    // TODO: Add dealer finishing game to the api (starting game comes with the room)
    // TODO: Add 'room name' capability to the API
    // TODO: Change the room route to include room name
    // TODO: In room/welcome guard check (with api?) sessionId token is valid (i.e. the sessionId you have is for the right room)
    // TODO: Add 'wakeup' call to to API
    // TODO: Add 'loadingApi' element that is on form submission && api not woken up
    // TODO: Push angular codebase to heroku, push asp.net codebase to angular
  }

}
