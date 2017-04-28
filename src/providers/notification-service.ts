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

    this.notify.schedule({
      id: Utils.getNumberFromString(reminder.id),
      title: reminder.type + ' Post',
      text: 'You have a ' + info + ' post at ' + time,
      at: date,
      every: reminder.repeat ? reminder.repeat : 0
    });
  }

  onNotificationTap(scope, callback: (reminder) => any): void {
    this.notify.on('click', reminder => {
      callback.call(scope, reminder);
    });
  }
}
