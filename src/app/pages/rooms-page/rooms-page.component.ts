import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { votersSelector, votingLockedSelector, myInformationSelector, roomSelector } from '@src/app/state/app.selectors';
import { map, filter, first } from 'rxjs/operators';
import { RoleType } from '@src/app/enums/role-type.enum';
import { roomPageNavigatedAction } from '@src/app/state/app.actions';
import { Router, ActivatedRoute } from '@angular/router';

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
    navigator.clipboard.writeText(window.location.href);
    alert("Copied room link to clipboard!");
  }

}
