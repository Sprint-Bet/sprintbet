import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';
import { VotingCardsComponent } from './components/voting-cards/voting-cards.component';
import { VotersComponent } from './components/voters/voters.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DealerControlsComponent } from './components/dealer-controls/dealer-controls.component';
import { RoomControlsComponent } from './components/room-controls/room-controls.component';
import { WelcomePageCreateComponent } from './pages/welcome-page-create/welcome-page-create.component';
import { WelcomePageJoinComponent } from './pages/welcome-page-join/welcome-page-join.component';
import { ErrorReconnectingComponent } from './pages/error-reconnecting/error-reconnecting.component';
import { AlertComponent } from './components/alert/alert.component';
import { VotesAreMatching } from './pipes/votes-are-matching.pipe';
import { DealerIconComponent } from './components/dealer-icon/dealer-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavbarComponent,
    PageNotFoundComponent,
    RoomsPageComponent,
    VotingCardsComponent,
    VotersComponent,
    DealerControlsComponent,
    RoomControlsComponent,
    WelcomePageCreateComponent,
    WelcomePageJoinComponent,
    ErrorReconnectingComponent,
    AlertComponent,
    VotesAreMatching,
    DealerIconComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ appState : reducer }),
    EffectsModule.forRoot([AppEffects]),
    environment.extModules
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
