import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewVoter } from '@src/app/model/dtos/new-voter';
import { AppState } from '@src/app/state/app.state';
import { Store, select } from '@ngrx/store';
import { welcomePageJoinRoomClickedAction, welcomePageCreateRoomClickedAction, welcomeComponentNavigatedAction } from '@src/app/state/app.actions';
import { loadingSelector } from '@src/app/state/app.selectors';
import { ActivatedRoute } from '@angular/router';
import { RoleType } from '@src/app/enums/role-type.enum';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  private _isDealer = true;

  get isDealer(): boolean {
    return this._isDealer;
  }

  set isDealer(isDealer: boolean) {
    this._isDealer = isDealer;

    const group = this.registrationForm.get('group');
    this.isDealer ? group.clearValidators() : group.setValidators(Validators.required);
    group.updateValueAndValidity({ onlySelf: true });
  }

  registrationForm = this.formBuilder.group({
    name: ['', Validators.required],
    group: [''],
  });

  loading$ = this.store.pipe(select(loadingSelector));

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.store.dispatch(welcomeComponentNavigatedAction());

    const roomId = this.activatedRoute.snapshot.queryParamMap.get('id');
    if (!!roomId) {
      this.registrationForm.get('group').setValue(roomId);
      this.isDealer = false;
    }
  }

  createRoom() {
    this.isDealer = true;
    const registrationInfo = this.getRegistrationInfo(this.registrationForm);
    this.store.dispatch(welcomePageCreateRoomClickedAction({ registrationInfo }));
  }

  onSubmit(form: FormGroup) {
    if (this.isDealer) {
      this.isDealer = false;
      return;
    }

    const registrationInfo = this.getRegistrationInfo(form);
    this.store.dispatch(welcomePageJoinRoomClickedAction({ registrationInfo }));
  }

  getRegistrationInfo(form: FormGroup): NewVoter {
    return {
      role: this.isDealer ? RoleType.DEALER : RoleType.PARTICIPANT,
      name: form.get('name').value,
      group: form.get('group').value,
    };
  }

}
