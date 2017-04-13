import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';

import { LoginPage } from '../login/login';

import { FireAuthService } from '../../providers/fire-auth-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  private user = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private fireAuth: FireAuthService,
  ) {
    this.userService.getCurrentUser().then(user => {
      this.user = user;
    });
  }

  logout() {
    this.fireAuth.logout().then(res => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
