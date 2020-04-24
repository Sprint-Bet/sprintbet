import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewVoter } from '@src/app/model/dtos/new-voter';
import { AppState } from '@src/app/state/app.state';
import { Store, select } from '@ngrx/store';
import { welcomePageJoinRoomClickedAction } from '@src/app/state/app.actions';
import { loadingSelector } from '@src/app/state/app.selectors';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  name = '';
  dealerNotSelected = false;

  registrationForm = this.formBuilder.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    group: '',
  });

  loading$ = this.store.pipe(select(loadingSelector));

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
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

    this.dealerNotSelected =
      this.registrationForm.get('role').value === '0' ||
      this.registrationForm.get('role').value === '1';

    this.dealerNotSelected ?
      this.registrationForm.get('group').setValidators(Validators.required) :
      this.registrationForm.get('group').clearValidators();

    this.registrationForm.get('group').updateValueAndValidity();
  }

}
