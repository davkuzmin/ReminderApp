import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';

import Utils from '../../app/utils';
import { OffsetISODate } from '../../app/pipes';

import { AddReminder } from '../add-reminder/add-reminder';
import { ViewReminder } from '../view-reminder/view-reminder';

import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  private loading;

  private reminders: any[] = [];
  private currentReminders: any[] = [];
  private pastReminders: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private localNotif: LocalNotifications,
  ) {
    this.localNotif.schedule({text: "Surprise!"});

    this.loading = this.loadingCtrl.create({
      content: 'Loading reminders...'
    });
    this.loading.present();
  }

  ionViewWillEnter() {
    this.updateReminders();
  }

  updateReminders() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(user.uid).once('value').then((snapshot) => {
          this.reminders = Utils.ObjToArray(snapshot.val());
          this.currentReminders = this.getCurrentReminders();
          this.pastReminders = Utils.arrayDiff(this.reminders, this.currentReminders);

          //this.notifications.checkNotifications(this.reminders);
          this.loading.dismiss();
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
    this.navCtrl.push(ViewReminder, {
      reminder: reminder
    });
  }

  getCurrentReminders() {
    let now = new Date();
    return this.reminders.filter(reminder => {
      return Utils.getDateFromOffsetISOString(reminder.datetime) >= now;
    });
  }
}
