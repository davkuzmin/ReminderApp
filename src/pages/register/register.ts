import { Component } from '@angular/core';
import { RemindersPage } from '../reminders/reminders';
import { HowToPage } from '../how-to/how-to';

import { NavController, ToastController } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public email: string = "";
  public password: string = "";

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  register() {
    firebase.auth().createUserWithEmailAndPassword(this.email.trim(), this.password.trim()).then(() => {
      this.navCtrl.push(HowToPage, {}, {animate: false});
    }).catch(function(e) {
      this.showToast(e);
    });
  }

  showToast(e) {
    let toast = this.toastCtrl.create({
      message: e.message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }
}
