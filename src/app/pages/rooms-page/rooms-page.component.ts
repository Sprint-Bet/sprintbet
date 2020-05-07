import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { votersSelector, votingLockedSelector, myInformationSelector, roomSelector } from '@src/app/state/app.selectors';
import { map, filter } from 'rxjs/operators';
import { RoleType } from '@src/app/enums/role-type.enum';
import { roomPageNavigatedAction } from '@src/app/state/app.actions';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  votingLocked$ = this.store.pipe(select(votingLockedSelector));
  voters$ = this.store.pipe(select(votersSelector));
  room$ = this.store.pipe(select(roomSelector));

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
    // DONE: Nativescript setup (https://docs.nativescript.org/angular/code-sharing/migrating-a-web-project)
    // DONE: Bug (null voter id) when part partipant leaves group
    // DONE: Get voters by room id
    // DONE: Get listenFor working for dealer
    // DONE: Add a roomService to api, check whether a room with that name exists before creating
    // DONE: Add 'room name' (id) capability to the API
    // DONE: Change the room route to include room name (id)
    // DONE: refactor 'castVote' AND OTHER METHODS to update hub client only for their group
    // DONE: Add dealer finishing game to the api (starting game comes with the room)
    // DONE: Push angular codebase to heroku, push asp.net codebase to angular
    // DONE: Role change Buttons to make PUT requests to server to update role
    // DONE: Move role selector into room-controls as buttons 'I want to vote!' 'I only want to watch'
    // DONE: Remove Group name from form, move create room button to be side by side join room
    // DONE: Rename api to voter controller (and voter/voting hub?)

    // TODO
    // TODO: Add vote functionality to dealer
    // TODO: Consider disabling revealing voting by showing number of people left to vote
    // TODO: Tweak wording to say 'reveal votes', which should allow removing the alerts
    // TODO: Store vote in the state i.e. wipe the vote on voting unlocked event
    // TODO: Get refreshing working
    // TODO: Fix Welcome page redirect query params
    // TODO: In room/welcome guard check (with api?) sessionId token is valid (i.e. the sessionId you have is for the right room)
    // TODO: Add 'wakeup' call to to API
    // TODO: Add 'loadingApi' element that is on form submission && api not woken up

    // TODO:
    // TODO: Nativescript initial routing - consider shared route (docs.nativescript.org/angular/code-sharing/migrating-a-web-project)
    // TODO: Use Interface pattern for services (and rename IHub?)
  }

}
