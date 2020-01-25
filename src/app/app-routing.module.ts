import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from '@src/app/pages/welcome-page/welcome-page.component';
import { PageNotFoundComponent } from '@src/app/components/page-not-found/page-not-found.component';
import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';

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
    }
  },
  {
    path: 'rooms',
    component: RoomsPageComponent,
    data: {
      title: 'Room'
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
