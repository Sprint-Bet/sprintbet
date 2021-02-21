import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { errorHandlingDismissAlertClickedAction } from 'src/app/state/app.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private _error: HttpErrorResponse = {} as HttpErrorResponse;

  errorMessage: string = '';

  @Input()
  set error(error: HttpErrorResponse) {
    if (!error) return;

    this._error = error;
    const sprintBetError = error.error && error.error.errors && error.error.errors[0].errorMessage;
    this.errorMessage = sprintBetError
      || this._error.error
      || this._error.message
      || 'No details available for this error';
  }

  get error(): HttpErrorResponse {
    return this._error;
  }

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  dismissAlert() {
    this.store.dispatch(errorHandlingDismissAlertClickedAction());
  }

}
