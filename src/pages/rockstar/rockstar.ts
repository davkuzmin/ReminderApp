import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddRockstarPage } from '../add-rockstar/add-rockstar';

import firebase from 'firebase';

@Component({
  selector: 'page-rockstar',
  templateUrl: 'rockstar.html',
  providers: [AddRockstarPage],
})
export class RockstarPage {
  private user: any;
  private guides = [{
    title: "This is a guide for rockstars only!",
    text: "Following these simple instructions will make you a rockstar in no time!"
  },{
    title: "This is a another guide!",
    text: "Following these very simple instructions will make you a super duper rockstar in no time!"
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getUser();
  }

  getUser() {
    let user = firebase.auth().currentUser;

    return firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
      this.user = snapshot.val();
    });
  }

  isAdmin() {
    return this.user ? this.user.isAdmin : false;
  }

  addGuide() {
    this.navCtrl.push(AddRockstarPage, this.user);
  }
}
