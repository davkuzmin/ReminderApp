import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FireAuthService } from '../providers/fire-auth-service';

import firebase from 'firebase';

import { HowToPage } from '../pages/how-to/how-to';
import { SchedulePage } from '../pages/schedule/schedule';
import { LoginPage } from '../pages/login/login';
import { RockstarPage } from '../pages/rockstar/rockstar';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';

declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private fireAuth: FireAuthService
  ) {
    this.initializeApp();

    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      self.nav.setRoot(user ? SchedulePage : LoginPage);
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'How To', component: HowToPage },
      { title: 'Scheduling', component: SchedulePage },
      { title: 'Rockstar Training', component: RockstarPage },
      { title: 'About', component: AboutPage }
    ];

  }

  initializeApp() {
    firebase.initializeApp({
      apiKey: "AIzaSyDjrD83IP68C1KxkKOdrUoX7MYCReD1Snk",
      authDomain: "reminderapp-bb5a7.firebaseapp.com",
      databaseURL: "https://reminderapp-bb5a7.firebaseio.com",
      projectId: "reminderapp-bb5a7",
      storageBucket: "reminderapp-bb5a7.appspot.com",
      messagingSenderId: "554293570088"
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      FCMPlugin.onNotification(data => {
        if(data.wasTapped){
          alert('App closed: ' + JSON.stringify(data));
        } else {
          alert('App open: ' + JSON.stringify(data));
        }
      }, msg => alert(JSON.stringify(msg)));
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  settings() {
    this.nav.setRoot(SettingsPage);
  }
}
