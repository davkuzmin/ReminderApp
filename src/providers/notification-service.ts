import { Injectable } from '@angular/core';
import Utils from '../app/utils';

import { LocalNotifications } from '@ionic-native/local-notifications'

@Injectable()
export class NotificationService {

  constructor(public notify: LocalNotifications) { }

  //github.com/katzer/cordova-plugin-local-notifications/wiki/04.-Scheduling
  scheduleNotification(reminder) {
    let info = reminder.category + ' ' + reminder.type
    let date = Utils.getDateFromOffsetISOString(reminder.datetime);
    let time = Utils.getTimeStringFromDate(date);
    let notificationNumber = Utils.getNumberFromString(reminder.id);

    this.notify.isPresent(notificationNumber).then((isPresent) => {
      if (isPresent) {
        this.notify.update({
          id: notificationNumber,
          title: reminder.type + ' Post',
          text: 'You have a ' + info + ' post at ' + time,
          at: date,
          every: reminder.repeat ? reminder.repeat : 0
        });
      } else {
        this.notify.schedule({
          id: notificationNumber,
          title: reminder.type + ' Post',
          text: 'You have a ' + info + ' post at ' + time,
          at: date,
          every: reminder.repeat ? reminder.repeat : 0
        });
      }
    });
  }

  clearNotification(reminder) {
    return this.notify.cancel(Utils.getNumberFromString(reminder.id));
  }

  onNotificationTap(scope, callback: (reminder) => any): void {
    this.notify.on('click', (reminder, state) => {
      callback.call(scope, reminder);
    });
  }
}
