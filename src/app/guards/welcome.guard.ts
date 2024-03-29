import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AppState } from '../state/app.state';
import { Store, select } from '@ngrx/store';
import { sessionIdSelector } from '../state/app.selectors';
import { map } from 'rxjs/operators';
import { StorageKey } from '../enums/storage-key.enum';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const hasRoomIdQueryParam = route.queryParamMap.has('id');

    const roomPageUrlTree = this.router.createUrlTree(['room']);

    const joinPageUrlTree = this.router.createUrlTree(['/', 'join'], {
      queryParams: route.queryParams,
      queryParamsHandling: 'merge'
    });

    if (route.queryParamMap.has('error')) {
      return true;
    }

    return this.store.pipe(
      select(sessionIdSelector),
      map(sessionIdFromState => sessionIdFromState || this.localStorageService.getItem(StorageKey.SESSION_ID)),
      map(hasSessionId => {
        if (hasSessionId) {
          return roomPageUrlTree;
        }

        if (hasRoomIdQueryParam) {
          return joinPageUrlTree;
        }
        
        // Allow to welcome page, because they have no room ID in URL or saved session ID
        return true;
      }),
    );
  }

}
