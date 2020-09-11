import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { signalRConnectedSelector } from '@src/app/state/app.selectors';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() error$: Observable<HttpErrorResponse>;

  signalRConnected$ = this.store.pipe(select(signalRConnectedSelector));

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

}
