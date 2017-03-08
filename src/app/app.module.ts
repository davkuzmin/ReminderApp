import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GuidesPage } from '../pages/guides/guides';
import { RemindersPage } from '../pages/reminders/reminders';
import { TabsPage } from '../pages/tabs/tabs';

import { ViewGuide } from '../pages/view-guide/view-guide';
import { AddReminder } from '../pages/add-reminder/add-reminder';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

@NgModule({
  declarations: [
    MyApp,
    GuidesPage,
    RemindersPage,
    TabsPage,
    AddReminder,
    LoginPage,
    RegisterPage,
    ViewGuide
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GuidesPage,
    RemindersPage,
    TabsPage,
    AddReminder,
    LoginPage,
    RegisterPage,
    ViewGuide
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
