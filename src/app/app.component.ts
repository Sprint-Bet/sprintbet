import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { appComponentNavigatedAction } from './state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {

    /**
     * Page title setup
     */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router)
    ).subscribe((event) => {
      const title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' | ');
      this.titleService.setTitle(title + ' | Sprint Bet');
    });
  }

  /**
   * Get title from the route data
   * @param state router state
   * @param parent parent route
   */
  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

}
