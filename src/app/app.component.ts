import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  public rootPage = LoginPage;

  constructor(public platform: Platform, public alertCtrl: AlertController) {
    firebase.initializeApp({
      apiKey: "AIzaSyDjrD83IP68C1KxkKOdrUoX7MYCReD1Snk",
      authDomain: "reminderapp-bb5a7.firebaseapp.com",
      databaseURL: "https://reminderapp-bb5a7.firebaseio.com",
      storageBucket: "reminderapp-bb5a7.appspot.com",
      messagingSenderId: "554293570088"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
