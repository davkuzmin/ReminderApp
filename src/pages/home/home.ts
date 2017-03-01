import { Component } from '@angular/core';
import { AddReminder } from '../addReminder/addReminder'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  reminders = [{
    title: "myTitle",
    category: "myCategory",
    computedText: "myText"
  },{
    title: "myTitle",
    category: "myCategory",
    computedText: "myText"
  },{
    title: "myTitle",
    category: "myCategory",
    computedText: "myText"
  },{
    title: "myTitle",
    category: "myCategory",
    computedText: "myText"
  }];

  constructor(public navCtrl: NavController) {

  }

  addReminder() {
    this.navCtrl.push(AddReminder);
  }
}
