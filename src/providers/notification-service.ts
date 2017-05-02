import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import Utils from '../app/utils';

import { LocalNotifications } from '@ionic-native/local-notifications'

@Injectable()
export class NotificationService {
  private fcm_key = 'AAAAgQ54qig:APA91bFYY8CZjibPj1d31ayc5Ci6WIrpVzJAw-2p2ZLJ6tKMYzwiIkL2xrtOb56erVi8CGSsL9yRkn5CY97cMNPUgbBPZ7AByPYJ-l5JrHSB2kQwfMfuNL1ET8Gm9_fs3yICneAeUial';

  constructor(
    public notify: LocalNotifications,
    public http: Http,
  ) { }

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

  sendPushNotification(title: string, body: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'key=' + this.fcm_key);
    let options = new RequestOptions({ headers: headers });

    let params = {
      "notification": {
        "title": title,
        "body": body,
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",  //Must be present for Android
        "icon": "fcm_push_icon"  //White icon Android resource
      },
      "data":{
        "param1":"value1",
        "param2": 'value2'
      },
      "to":"/topics/all", //Topic or single device
      "priority":"high",
    };

    this.http.post('https://fcm.googleapis.com/fcm/send', params, options).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  onNotificationTap(scope, callback: (reminder) => any): void {
    this.notify.on('click', (reminder, state) => {
      callback.call(scope, reminder);
    });
  }
}
