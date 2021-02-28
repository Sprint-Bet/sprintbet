import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, iif, combineLatest, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { StorageKey } from '../enums/storage-key.enum';
import { AppState } from '../state/app.state';
import { Store, select } from '@ngrx/store';
import { sessionIdSelector, myInformationSelector, signalRConnectedSelector } from '../state/app.selectors';
import { map, switchMap, first, filter, mapTo } from 'rxjs/operators';
import { storedIdNotFoundInStateAction, roomGuardReconnectVoterRequestAction, roomGuardNavigatedAction, addTokenToStateAction } from '../state/app.actions';

@Injectable({
  providedIn: 'root'
})
export class RoomGuard implements CanActivate {
  private signalRConnected$ = this.store.pipe(
    select(signalRConnectedSelector),
    filter(connected => !!connected),
    first(),
  );

  private sessionId$ = this.store.pipe(
    select(sessionIdSelector),
  );

  private validInfo$ = this.store.pipe(
    select(myInformationSelector),
    filter(myInfo => !!myInfo),
    first(),
  );

  private hasId$ = this.sessionId$.pipe(
    map(sessionId => this.matchStateIdToStoredId(sessionId)),
  );

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    // Kick off signal r setup if arriving directly from a refresh
    this.store.dispatch(roomGuardNavigatedAction());

    // If session ID is immediately available in store (also not from refresh), allow safe passage
    this.sessionId$.pipe(
      first()
    ).subscribe(sessionId => {
      if (!!sessionId) {
        return true;
      }
    });

    // Prepare rejection url
    const welcomeUrlTree = this.router.createUrlTree(['/'], {
      queryParams: route.queryParams,
      queryParamsHandling: 'merge'
    });

    // If a session ID is found in local storage, request voter and set as mine
    combineLatest(
      this.hasId$,
      this.sessionId$.pipe(filter(sessionId => !!sessionId), first()),
      this.signalRConnected$,
    ).pipe(first()).subscribe(([hasId, sessionId, _]) => {
      if (hasId && !!sessionId) {
        this.store.dispatch(roomGuardReconnectVoterRequestAction({ voterId: sessionId }));
      }
    });

    // Wait to confirm either no id found or a valid voter to be set
    return this.hasId$.pipe(
        switchMap(hasId => iif(
            () => hasId,
            this.validInfo$.pipe(mapTo(true)),
            of(welcomeUrlTree)
        ))
    );
  }

  /**
   * Make sure local storage and state are aligned
   * @param sessionId session id from the ngrx store
   */
  private matchStateIdToStoredId(sessionId: string) {
    const storedId = this.localStorageService.getItem(StorageKey.SESSION_ID);
    if (!sessionId && !!storedId) {
      this.store.dispatch(storedIdNotFoundInStateAction({ sessionId: storedId }));
      this.addStoredTokenToState();
    }

    return !!storedId;
  }

  private addStoredTokenToState(): void {
    const token = this.localStorageService.getItem(StorageKey.TOKEN);
    this.store.dispatch(addTokenToStateAction({ token }));
  }

}
