import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AppState } from '../state/app.state';
import { Store, select } from '@ngrx/store';
import { tokenSelector } from '../state/app.selectors';
import { map } from 'rxjs/operators';
import { StorageKey } from '../enums/storage-key.enum';
import { JwtService } from '../services/jwt.service';
import { jwtGuardTokenExpiredAction } from '../state/app.actions';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private router: Router,
    private jwtService: JwtService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const hasRoomIdQuery = route.queryParamMap.has('id');
    const storedToken = this.localStorageService.getItem(StorageKey.TOKEN);
    const roomUrlTree = this.router.createUrlTree(['rooms']);
    const joinRoomUrlTree = this.router.createUrlTree(['/', 'join'], {
      queryParams: route.queryParams,
      queryParamsHandling: 'merge'
    });

    debugger;

    if (!!storedToken && this.jwtService.hasTokenExpired(storedToken)) {
      const message = "Previous session has expired. Please join or create a new room";
      this.store.dispatch(jwtGuardTokenExpiredAction({ message }));
      route.queryParams = { ...route.queryParams, error: true };
      return true;
    }

    if (route.queryParamMap.has('error')) {
      return true;
    }

    return this.store.pipe(
      select(tokenSelector),
      map(token => !!token),
      map(hasToken => hasToken
        ? roomUrlTree
        : hasRoomIdQuery
          ? joinRoomUrlTree
          : true
      ),
    );
  }

}
