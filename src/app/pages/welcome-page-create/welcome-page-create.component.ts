import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewVoter } from '@src/app/model/dtos/new-voter';
import { AppState } from '@src/app/state/app.state';
import { Store, select } from '@ngrx/store';
import { welcomePageCreateRoomClickedAction, welcomeComponentNavigatedAction } from '@src/app/state/app.actions';
import { loadingSelector } from '@src/app/state/app.selectors';
import { ActivatedRoute } from '@angular/router';
import { RoleType } from '@src/app/enums/role-type.enum';

@Component({
  selector: 'app-welcome-page-create',
  templateUrl: './welcome-page-create.component.html',
  styleUrls: ['./welcome-page-create.component.scss']
})
export class WelcomePageCreateComponent implements OnInit {
  title = this.activatedRoute.snapshot.data.title;

  registrationForm = this.formBuilder.group({
    name: ['', Validators.required],
    itemsType: ['fibonacci', Validators.required],
    role: RoleType.DEALER,
    group: '',
  });

  loading$ = this.store.pipe(select(loadingSelector));

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.store.dispatch(welcomeComponentNavigatedAction());
  }

  onSubmit(form: FormGroup) {
    const registrationInfo = form.value as NewVoter;
    this.store.dispatch(welcomePageCreateRoomClickedAction({ registrationInfo }));
  }

}
