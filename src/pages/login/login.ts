import { Component } from '@angular/core';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

import { NavController, ToastController } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public email;
  public password;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  login() {
    let self = this;

    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
      self.navCtrl.setRoot(HomePage);
    }).catch(function(error) {
      console.log(error.message);
      self.invalidLogin();
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  invalidLogin() {
    let toast = this.toastCtrl.create({
      message: 'Invalid Credentials',
      duration: 2500,
      position: 'bottom'
    });

    toast.present();
  }
}
