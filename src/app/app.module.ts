import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { AutoGeneratedComponent } from '@src/app/auto-generated/auto-generated.component';
import { WelcomePageComponent } from '@src/app/pages/welcome-page/welcome-page.component';
import { PageNotFoundComponent } from '@src/app/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoGeneratedComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
