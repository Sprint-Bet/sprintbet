import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@src/app/state/app.state';
import { signalRConnectedSelector, errorSelector } from '@src/app/state/app.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signalRConnected$ = this.store.pipe(select(signalRConnectedSelector));
  error$ = this.store.pipe(select(errorSelector));

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

}
