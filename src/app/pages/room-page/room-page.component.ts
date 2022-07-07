import { Component, OnInit, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, InitialMyInformation } from 'src/app/state/app.state';
import { votersSelector, votingLockedSelector, myInformationSelector, roomSelector } from 'src/app/state/app.selectors';
import { map, filter, first } from 'rxjs/operators';
import { RoleType } from 'src/app/enums/role-type.enum';
import { roomPageNavigatedAction } from 'src/app/state/app.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { combineLatest } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {
  initialMyInformation = InitialMyInformation;

  myInformation$ = this.store.pipe(select(myInformationSelector));

  votingLocked$ = this.store.pipe(select(votingLockedSelector));

  room$ = this.store.pipe(select(roomSelector));

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

  private hasRoomIdQueryParam$ = this.activatedRoute.queryParamMap.pipe(
    first(),
    map(queryParamMap => !!queryParamMap.get('id'))
  );

  private roomIdAndValidInfo$ = combineLatest([
    this.hasRoomIdQueryParam$,
    this.myInformation$.pipe(filter(myInformation => !!myInformation?.room?.id))
  ]);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.roomIdAndValidInfo$.pipe(first()).subscribe(([hasRoomIdQueryParam, myInfo]) => {
      this.titleService.setTitle(`Room: ${myInfo.room?.name || myInfo.room.id} | Sprint Bet`);

      if (hasRoomIdQueryParam) {
        return;
      }

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { id: myInfo.room.id },
        queryParamsHandling: 'merge'
      });
    });

    this.store.dispatch(roomPageNavigatedAction());
  }

  copyUrlToClipboard(): void {
    let url = '';

    this.room$.pipe(filter(room => !!room), first()).subscribe(room => {
      url = window.location.href;
    });

    this.copyTextToClipboard(url);

    alert(`Copied room link to clipboard:\n${url}`);
  }

  copyTextToClipboard(text: string) {
    // Create a textbox field where we can insert text to.
    const copyFrom = this.document.createElement('textarea');

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
