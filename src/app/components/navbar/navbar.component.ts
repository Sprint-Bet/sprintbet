import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { signalRConnectedSelector } from 'src/app/state/app.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signalRConnected$ = this.store.pipe(select(signalRConnectedSelector));

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

}
