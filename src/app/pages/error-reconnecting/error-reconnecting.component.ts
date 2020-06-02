import { Component, OnInit } from '@angular/core';
import { AppState } from '@src/app/state/app.state';
import { Store } from '@ngrx/store';
import { signalRDisconnectionStartAction } from '@src/app/state/app.actions';

@Component({
  selector: 'app-error-reconnecting',
  templateUrl: './error-reconnecting.component.html',
  styleUrls: ['./error-reconnecting.component.scss']
})
export class ErrorReconnectingComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

  disconnectSignalR() {
    this.store.dispatch(signalRDisconnectionStartAction());
  }
}
