import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from '@src/app/pages/welcome-page/welcome-page.component';
import { PageNotFoundComponent } from '@src/app/components/page-not-found/page-not-found.component';
import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';
import { RoomGuard } from './guards/room.guard';
import { WelcomeGuard } from './guards/welcome.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    data: {
      title: 'Welcome'
    },
    canActivate: [WelcomeGuard]
  },
  {
    path: 'rooms',
    component: RoomsPageComponent,
    data: {
      title: 'Room'
    },
    canActivate: [RoomGuard]
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
