import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { StorageKey } from '../enums/storage-key.enum';
import { AppState } from '../state/app.state';
import { Store, select } from '@ngrx/store';
import { sessionIdSelector } from '../state/app.selectors';
import { map } from 'rxjs/operators';

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
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.pipe(
      select(sessionIdSelector),
      map(stateId => !!stateId || this.localStorageService.getItem(StorageKey.SESSION_ID)),
      map(hasId => hasId ? true : this.router.createUrlTree(['/'])),
    );
  }

}
