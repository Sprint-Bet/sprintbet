import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomPageComponent } from './pages/room-page/room-page.component';
import { RoomGuard } from './guards/room.guard';
import { WelcomePageCreateComponent } from './pages/welcome-page-create/welcome-page-create.component';
import { WelcomePageJoinComponent } from './pages/welcome-page-join/welcome-page-join.component';
import { WelcomeGuard } from './guards/welcome.guard';
import { ErrorReconnectingComponent } from './pages/error-reconnecting/error-reconnecting.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
    data: {
      title: 'Welcome'
    },
    canActivate: [ WelcomeGuard ]
  },
  {
    path: 'new',
    component: WelcomePageCreateComponent,
    data: {
      title: 'New game'
    }
  },
  {
    path: 'join',
    component: WelcomePageJoinComponent,
    data: {
      title: 'Join a game'
    }
  },
  {
    path: 'room',
    component: RoomPageComponent,
    data: {
      title: 'Room'
    },
    canActivate: [RoomGuard]
  },
  {
    path: 'error-reconnecting',
    component: ErrorReconnectingComponent,
    data: {
      title: 'Cannot connect'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Page not found'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
