import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module.tns';
import { AppComponent } from '@src/app/app.component';
import { AutoGeneratedComponent } from '@src/app/auto-generated/auto-generated.component';
import { WelcomePageComponent } from '@src/app/pages/welcome-page/welcome-page.component';
import { NavbarComponent } from '@src/app/components/navbar/navbar.component';
import { PageNotFoundComponent } from '@src/app/pages/page-not-found/page-not-found.component';
import { RoomsPageComponent } from '@src/app/pages/rooms-page/rooms-page.component';
import { VotingCardsComponent } from '@src/app/components/voting-cards/voting-cards.component';
import { VotersComponent } from '@src/app/components/voters/voters.component';
import { DealerControlsComponent } from '@src/app/components/dealer-controls/dealer-controls.component';
import { RoomControlsComponent } from '@src/app/components/room-controls/room-controls.component';

import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomePageCreateComponent } from '@src/app/pages/welcome-page-create/welcome-page-create.component';
import { WelcomePageJoinComponent } from '@src/app/pages/welcome-page-join/welcome-page-join.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

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
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
