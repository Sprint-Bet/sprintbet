import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewVoter } from '@src/app/model/dtos/new-voter';
import { AppState } from '@src/app/state/app.state';
import { Store, select } from '@ngrx/store';
import { welcomePageJoinRoomClickedAction, welcomeComponentNavigatedAction } from '@src/app/state/app.actions';
import { loadingSelector } from '@src/app/state/app.selectors';
import { ActivatedRoute } from '@angular/router';
import { RoleType } from '@src/app/enums/role-type.enum';

@Component({
  selector: 'app-welcome-page-join',
  templateUrl: './welcome-page-join.component.html',
  styleUrls: ['./welcome-page-join.component.scss']
})
export class WelcomePageJoinComponent implements OnInit {
  title = this.activatedRoute.snapshot.data.title;

  registrationForm = this.formBuilder.group({
    name: ['', Validators.required],
    group: ['', Validators.required],
  });

  loading$ = this.store.pipe(select(loadingSelector));

  hasGroupIdQuery = false;

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
      this.hasGroupIdQuery = true;
    }
  }

  onSubmit(form: FormGroup) {
    const registrationInfo = this.getRegistrationInfo(form);
    this.store.dispatch(welcomePageJoinRoomClickedAction({ registrationInfo }));
  }

  getRegistrationInfo(form: FormGroup): NewVoter {
    return {
      ...form.value,
      role: RoleType.PARTICIPANT,
    };
  }

}
