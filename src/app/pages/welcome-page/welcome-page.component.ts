import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewVoter } from '@src/app/model/dtos/new-voter';
import { AppState } from '@src/app/state/app.state';
import { Store, select } from '@ngrx/store';
import { welcomePageJoinRoomClickedAction, welcomePageCreateRoomClickedAction } from '@src/app/state/app.actions';
import { loadingSelector, roomSelector } from '@src/app/state/app.selectors';
import { tap, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  name = '';
  dealerSelected = false;

  registrationForm = this.formBuilder.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    group: ['', Validators.required],
  });

  loading$ = this.store.pipe(select(loadingSelector));
  room$ = this.store.pipe(
    select(roomSelector),
    filter(room => !!room),
    tap(room => {
      this.registrationForm.get('group').setValue(room.id);
    }),
  );

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const roomId = this.activatedRoute.snapshot.queryParamMap.get('id');
    if (!!roomId) {
      this.registrationForm.get('group').setValue(roomId);
      this.registrationForm.get('role').setValue('0');
    }
  }

  onSubmit(form: FormGroup) {
    const registrationInfo: NewVoter = {
      name: form['name'],
      role: form['role'],
      group: form['group'],
    };

    this.store.dispatch(welcomePageJoinRoomClickedAction({registrationInfo}));
  }

  roleChange(tnsPickerIndex?: number) {
    if (!!tnsPickerIndex) {
      this.registrationForm.get('role').setValue(tnsPickerIndex.toString());
    }

    this.dealerSelected = this.registrationForm.get('role').value === '2';
  }

  createRoom() {
    const groupName = this.registrationForm.get('group').value;
    this.store.dispatch(welcomePageCreateRoomClickedAction({ roomName: groupName}));
  }

}
