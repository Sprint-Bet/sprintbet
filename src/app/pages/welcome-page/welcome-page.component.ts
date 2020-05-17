import { Component, OnInit } from '@angular/core';
import { AppState } from '@src/app/state/app.state';
import { Store } from '@ngrx/store';
import { welcomeComponentNavigatedAction } from '@src/app/state/app.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  title = this.activatedRoute.snapshot.data.title;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.store.dispatch(welcomeComponentNavigatedAction());
  }

}
