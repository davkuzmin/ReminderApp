import { Component } from '@angular/core';
import { RegisterPage } from '../register/register';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  login() {
    //TODO firebase login call
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
}
