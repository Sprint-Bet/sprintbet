import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
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

    const hasRoomIdQuery = route.queryParamMap.has('id');

    const rejoinRoomUrlTree = this.router.createUrlTree(['rooms']);

    const roomSignupUrlTree = this.router.createUrlTree(['/', 'join'], {
      queryParams: route.queryParams,
      queryParamsHandling: 'merge'
    });

    return this.store.pipe(
      select(sessionIdSelector),
      map(stateId => !!stateId || this.localStorageService.getItem(StorageKey.SESSION_ID)),
      map(hasId => hasId
        ? rejoinRoomUrlTree
        : hasRoomIdQuery
          ? roomSignupUrlTree
          : true
      ),
    );
  }

}
