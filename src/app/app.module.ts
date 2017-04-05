import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HowToPage } from '../pages/how-to/how-to';
import { SchedulePage } from '../pages/schedule/schedule';
import { RockstarPage } from '../pages/rockstar/rockstar';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { AddReminder } from '../pages/add-reminder/add-reminder';
import { ViewReminder } from '../pages/view-reminder/view-reminder';

import { Facebook } from '@ionic-native/facebook';
import { FireAuthService } from '../providers/fire-auth-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OffsetISODate } from './pipes'

@NgModule({
  declarations: [
    MyApp,
    HowToPage,
    SchedulePage,
    LoginPage,
    RegisterPage,
    AboutPage,
    SettingsPage,
    RockstarPage,
    OffsetISODate,
    AddReminder,
    ViewReminder,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HowToPage,
    SchedulePage,
    LoginPage,
    RegisterPage,
    AboutPage,
    SettingsPage,
    RockstarPage,
    AddReminder,
    ViewReminder,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    FireAuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
