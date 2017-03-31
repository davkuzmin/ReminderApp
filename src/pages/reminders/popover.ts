import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { NavController, AlertController } from 'ionic-angular';
import { AddReminder } from '../add-reminder/add-reminder';


@Component({
  templateUrl: 'popover.html'
})

export class PopoverContentPage {
constructor(public viewCtrl: ViewController,public navCtrl: NavController) {}
close() {
    this.viewCtrl.dismiss();
  }


  addReminder() {
    this.navCtrl.push(AddReminder);
  }
}