import { Component } from '@angular/core';
import { AddReminder } from '../add-reminder/add-reminder'
import { NavController, AlertController } from 'ionic-angular';

import {ReminderView} from '../reminder-view/reminder-view';

import { LoginPage } from '../login/login'

import Utils from '../../app/utils';

import firebase from 'firebase';
import { FireAuthService } from '../../providers/fire-auth-service';

@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
  providers: [FireAuthService]
})
export class RemindersPage {
  private reminders: Array<any> = [];

  constructor(public navCtrl: NavController,
    private auth: FireAuthService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.updateReminders();
  }

  updateReminders() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(user.uid).once('value').then((snapshot) => {
          this.reminders = Utils.ObjToArray(snapshot.val());
        });
      }
    });
  }

  addReminder() {
    this.navCtrl.push(AddReminder);
  }

  getSocialMediaIcon(type: string) {
    return Utils.getSocialMediaIcon(type);
  }



  viewReminder(reminder) {
    this.navCtrl.push(ReminderView, {
      reminder:reminder
    })
  }






}
