import { Component } from '@angular/core';
import { RemindersPage } from '../reminders/reminders';
import { TabsPage } from '../tabs/tabs';

import { NavController } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public email;
  public password;

  constructor(public navCtrl: NavController) {

  }

  register() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
      this.navCtrl.push(TabsPage, {}, {animate: false});
    }).catch(function(error) {
      console.log(error.message);
    });
  }
}
