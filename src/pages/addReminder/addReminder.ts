import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-add-reminder',
  templateUrl: 'addReminder.html'
})
export class AddReminder {

  constructor(public navCtrl: NavController) {

  }

  saveReminder() {
    console.log('Reminder saved!');
  }
}
