import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { JwtInterceptor } from './login/services/jwt.interceptor';

import { HistoryModule } from './history/history.module';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { LoginModule } from './login/login.module';
import { CompetitiveModule } from './competitive/competitive.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    routing,
    BrowserModule,
    HttpClientModule,
    HistoryModule,
    ProfileModule,
    LoginModule,
    CompetitiveModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
