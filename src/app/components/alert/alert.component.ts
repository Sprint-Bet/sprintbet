import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private _error: HttpErrorResponse;

  errorMessage: string;

  @Input()
  set error(error: HttpErrorResponse) {
    if (!error) {
      return;
    }

    this._error = error;
    this.errorMessage = (error.error && error.error.errors[0].errorMessage)
      || this._error.message
      || 'No details available for this error';

  }

  get error(): HttpErrorResponse {
    return this._error;
  }

  constructor() { }

  ngOnInit() {
  }

}
