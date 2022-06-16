import { Component, OnInit, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, InitialMyInformation } from 'src/app/state/app.state';
import { votersSelector, votingLockedSelector, myInformationSelector, roomSelector } from 'src/app/state/app.selectors';
import { map, filter, first } from 'rxjs/operators';
import { RoleType } from 'src/app/enums/role-type.enum';
import { roomPageNavigatedAction } from 'src/app/state/app.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Room } from 'src/app/model/dtos/room';
import { Voter } from 'src/app/model/dtos/voter';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {
  initialMyInformation: Voter = InitialMyInformation;

  votingLocked$ = this.store.pipe(select(votingLockedSelector));
  room$: Observable<Room> = this.store.pipe(select(roomSelector));
  myInformation$: Observable<Voter> = this.store.pipe(
    select(myInformationSelector),
    filter(myInformation => !!myInformation),
  ) ;

  isDealer$: Observable<boolean> = this.myInformation$.pipe(
    map(myInformation => myInformation.room.dealerId === myInformation.id),
  );

  isParticipant$: Observable<boolean> = this.myInformation$.pipe(
    map(myInformation => +myInformation.role === +RoleType.PARTICIPANT),
  );

  allVoters$: Observable<Voter[]> = this.store.pipe(
    select(votersSelector),
    filter(allVoters => !!allVoters),
  );

  participants$: Observable<Voter[]> = this.allVoters$.pipe(
    map(voters => voters.filter(v => +v.role === +RoleType.PARTICIPANT)),
  );

  voted$: Observable<Voter[]> = this.participants$.pipe(
    map(participants => participants.filter(participant => participant.point)),
  );

  private hasRoomIdQuery$: Observable<boolean> = this.activatedRoute.queryParamMap.pipe(
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
      url = `${window.location.href}rooms?id=${room.id}`;
    });

    this.copyTextToClipboard(url);

    alert(`Copied room link to clipboard:\n${url}`);
  }

  copyTextToClipboard(text: string) {
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
