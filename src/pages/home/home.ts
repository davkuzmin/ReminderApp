import { Component } from '@angular/core';
import { AddReminder } from '../addReminder/addReminder'
import { NavController } from 'ionic-angular';

import Utils from '../../app/utils';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private reminders: Array<any>;

  constructor(public navCtrl: NavController) {
    this.updateReminders();
  }

  ngOnInit() {

  }

  updateReminders() {
    let self = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref(user.uid).once('value').then((snapshot) => {
          self.reminders = Utils.ObjToArray(snapshot.val());
        });
      }
    });
  }

  addReminder() {
    this.navCtrl.push(AddReminder);
  }
}
