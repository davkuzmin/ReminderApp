import { Component } from '@angular/core';
import { HomePage } from '../home/home'

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
      this.navCtrl.setRoot(HomePage);
    }).catch(function(error) {
      console.log(error.message);
    });
  }
}
