import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ViewRockstar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-rockstar',
  templateUrl: 'view-rockstar.html'
})
export class ViewRockstarPage {
  private guide;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.guide = this.navParams.data;
  }
}
