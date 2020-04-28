import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { StorageKey } from '../enums/storage-key.enum';
import { AppState } from '../state/app.state';
import { Store, select } from '@ngrx/store';
import { sessionIdSelector } from '../state/app.selectors';
import { map, tap } from 'rxjs/operators';
import { storedIdNotFoundInStateAction } from '../state/app.actions';

@Injectable({
  providedIn: 'root'
})
export class RoomGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(sessionIdSelector),
      map(stateId => this.matchStateIdToStoredId(stateId)),
      map(hasId => hasId ? true : this.router.createUrlTree(['/'], {
        queryParams: route.queryParams,
        queryParamsHandling: 'merge'
      })),
    );
  }

  matchStateIdToStoredId(stateId: string) {
    const storedId = this.localStorageService.getItem(StorageKey.SESSION_ID);
    if (!stateId && !!storedId) {
      this.store.dispatch(storedIdNotFoundInStateAction({ sessionId: storedId}));
    }

    return !!storedId;
  }

}
