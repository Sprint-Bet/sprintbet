import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { AutoGeneratedComponent } from '@src/app/auto-generated/auto-generated.component';
import { WelcomePageComponent } from '@src/app/pages/welcome-page/welcome-page.component';
import { NavbarComponent } from '@src/app/components/navbar/navbar.component';
import { PageNotFoundComponent } from '@src/app/pages/page-not-found/page-not-found.component';
import { RoomsPageComponent } from '@src/app/pages/rooms-page/rooms-page.component';
import { VotingCardsComponent } from '@src/app/components/voting-cards/voting-cards.component';
import { VotersComponent } from '@src/app/components/voters/voters.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '@src/app/state/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '@src/app/state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@src/environments/environment';
import { DealerControlsComponent } from '@src/app/components/dealer-controls/dealer-controls.component';
import { RoomControlsComponent } from '@src/app/components/room-controls/room-controls.component';
import { WelcomePageCreateComponent } from '@src/app/pages/welcome-page-create/welcome-page-create.component';
import { WelcomePageJoinComponent } from '@src/app/pages/welcome-page-join/welcome-page-join.component';
import { ErrorReconnectingComponent } from '@src/app/pages/error-reconnecting/error-reconnecting.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoGeneratedComponent,
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
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ appState : reducer }),
    EffectsModule.forRoot([AppEffects]),
    // Hopefully this is fixed now...
    // https://github.com/ngrx/platform/issues/1054
    StoreDevtoolsModule.instrument({
      name: 'Sprint Bet Devtools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
