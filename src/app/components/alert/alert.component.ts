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
  @Input() error: HttpErrorResponse | null = null;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  dismissAlert() {
    this.store.dispatch(errorHandlingDismissAlertClickedAction());
  }
}
