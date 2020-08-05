import { Component, OnInit, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { votersSelector, votingLockedSelector, myInformationSelector, roomSelector } from '@src/app/state/app.selectors';
import { map, filter, first } from 'rxjs/operators';
import { RoleType } from '@src/app/enums/role-type.enum';
import { roomPageNavigatedAction } from '@src/app/state/app.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  votingLocked$ = this.store.pipe(select(votingLockedSelector));
  room$ = this.store.pipe(select(roomSelector));

  myInformation$ = this.store.pipe(
    select(myInformationSelector),
    filter(myInformation => !!myInformation),
  );

  isDealer$ = this.myInformation$.pipe(
    map(myInformation => myInformation.room.dealerId === myInformation.id),
  );

  isParticipant$ = this.myInformation$.pipe(
    map(myInformation => +myInformation.role === +RoleType.PARTICIPANT),
  );

  allVoters$ = this.store.pipe(
    select(votersSelector),
    filter(allVoters => !!allVoters),
  );

  participants$ = this.allVoters$.pipe(
    map(voters => voters.filter(v => +v.role === +RoleType.PARTICIPANT)),
  );

  voted$ = this.participants$.pipe(
    map(participants => participants.filter(participant => participant.point)),
  );

  private hasRoomIdQuery$ = this.activatedRoute.queryParamMap.pipe(
    first(),
    map(params => params.has('id'))
  );

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: HTMLDocument 
  ) { }

  ngOnInit() {
    this.hasRoomIdQuery$.subscribe(hasRoomIdQuery => {
      if (hasRoomIdQuery) {
        return;
      }

      this.myInformation$.pipe(first()).subscribe(myInfo => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { id: myInfo.room.id },
          queryParamsHandling: 'merge'
        });
      });
    });

    this.store.dispatch(roomPageNavigatedAction());
  }

  copyUrlToClipboard(): void {
    let url = '';

    this.room$.pipe(filter(room => !!room), first()).subscribe(room => {
      url = `https://sprintbet.herokuapp.com/rooms?id=${room.id}`;
    });

    this.copyTextToClipboard(url);

    alert(`Copied room link to clipboard:\n${url}`);
  }

  copyTextToClipboard(text) {
    // Create a textbox field where we can insert text to. 
    var copyFrom = this.document.createElement("textarea");
  
    // Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;
  
    // Append the textbox field into the body as a child. 
    // "execCommand()" only works when there exists selected text, and the text is inside 
    // document.body (meaning the text is part of a valid rendered HTML element).
    this.document.body.appendChild(copyFrom);
  
    // Select all the text!
    copyFrom.select();
  
    // Execute command
    this.document.execCommand('copy');
  
    // (Optional) De-select the text using blur(). 
    copyFrom.blur();
  
    // Remove the textbox field from the document.body, so no other JavaScript nor 
    // other elements can get access to document
    this.document.body.removeChild(copyFrom);
  }

}
