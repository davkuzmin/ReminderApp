import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LocalNotifications } from '@ionic-native/local-notifications'

import { ReminderView } from '../reminder-view/reminder-view';
import { AddReminder } from '../add-reminder/add-reminder';
import { LoginPage } from '../login/login';
import { OffsetISODate } from '../../app/pipes';

import Utils from '../../app/utils';

import firebase from 'firebase';
import { FireAuthService } from '../../providers/fire-auth-service';

@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
  providers: [FireAuthService, LocalNotifications]
})
export class RemindersPage {
  private loader = null;
  private reminders: Array<any> = [];

  constructor(public navCtrl: NavController,
    private auth: FireAuthService,
    private alertCtrl: AlertController,
    private notify: LocalNotifications) { }

  ionViewWillEnter() {
    this.updateReminders();
  }

  updateReminders() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(user.uid).once('value').then((snapshot) => {
          this.reminders = Utils.ObjToArray(snapshot.val());
          this.checkNotifications();
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

  checkNotifications() {
    this.notify.hasPermission().then(val => {
      this.reminders.forEach(reminder => {
        this.notify.isScheduled(reminder.id).then((isScheduled) => {
          if (!isScheduled && !this.isOldReminder(reminder)) {
            this.scheduleNotification(reminder);
          }
        });
      });
    }).catch(err => { alert(err)});
  }

  scheduleNotification(reminder) {
    let info = reminder.category + ' ' + reminder.type
    let date = Utils.getDateFromOffsetISOString(reminder.datetime);
    let time = Utils.getTimeStringFromDate(date);

    this.notify.schedule({
      id: reminder.id,
      text: 'You have a ' + info + ' at ' + time,
      at: date
    });
  }

  isOldReminder(reminder): boolean {
    return Utils.getDateFromOffsetISOString(reminder.datetime) < new Date();
  }
}
