import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ViewGuide page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-guide',
  templateUrl: 'view-guide.html'
})
export class ViewGuide {
  public guide;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.guide = this.navParams.data;
  }

  ionViewDidLoad() {

  }

}
