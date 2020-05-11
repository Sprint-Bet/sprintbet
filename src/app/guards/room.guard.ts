import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, iif, combineLatest, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { StorageKey } from '../enums/storage-key.enum';
import { AppState } from '../state/app.state';
import { Store, select } from '@ngrx/store';
import { sessionIdSelector, myInformationSelector } from '../state/app.selectors';
import { map, tap, mergeMap, switchMap, first, filter, mapTo } from 'rxjs/operators';
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

    const welcomeUrlTree$ = of(
      this.router.createUrlTree(['/'], {
        queryParams: route.queryParams,
        queryParamsHandling: 'merge'
      })
    );

    const sessionId$ = this.store.pipe(
      select(sessionIdSelector),
      first(),
    );

    const validInfo$ = this.store.pipe(
      select(myInformationSelector),
      filter(myInfo => !!myInfo),
      first(),
    );

    const hasId$ = sessionId$.pipe(
      map(stateId => this.matchStateIdToStoredId(stateId)),
    );

    combineLatest(hasId$, sessionId$).subscribe(([hasId, sessionId]) => {
      if (hasId) {
          this.store.dispatch(getVoterGuardRequestAction({ sessionId }));
      }
    });

    return hasId$.pipe(
        switchMap(hasId => iif(
            () => hasId,
            validInfo$.pipe(mapTo(true)),
            welcomeUrlTree$
        ))
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
