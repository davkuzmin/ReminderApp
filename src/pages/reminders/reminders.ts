import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';

import { LocalNotifications } from '@ionic-native/local-notifications'

import { ReminderView } from '../reminder-view/reminder-view';
import { AddReminder } from '../add-reminder/add-reminder';
import { LoginPage } from '../login/login';

import Utils from '../../app/utils';

import firebase from 'firebase';
import { FireAuthService } from '../../providers/fire-auth-service';

@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
  providers: [FireAuthService, LocalNotifications]
})
export class RemindersPage {
  private reminders: Array<any> = [];

  constructor(public navCtrl: NavController,
    private auth: FireAuthService,
    private alertCtrl: AlertController,
    private notify: LocalNotifications) { }

  ionViewWillEnter() {
    this.updateReminders();
    this.notify.hasPermission().then(val => {
      if (val) {
        //TODO schedule reminder notifications
      } else {
        //TODO get permission
      }
    }).catch(err => { alert(err)});
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
    });
  }
}
