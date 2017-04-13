import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AddRockstarPage } from '../add-rockstar/add-rockstar';
import { ViewRockstarPage } from '../view-rockstar/view-rockstar';

import { GuideService } from '../../providers/guide-service';
import Utils from '../../app/utils';

import firebase from 'firebase';

@Component({
  selector: 'page-rockstar',
  templateUrl: 'rockstar.html',
  providers: [GuideService],
})
export class RockstarPage {
  private loading;

  private user: any = null;
  private guides = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public guideService: GuideService,
    private loadingCtrl: LoadingController,
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Loading guides...'
    });
    this.loading.present();
  }

  ionViewWillEnter() {
    this.updateGuides();
  }

  updateGuides() {
    return this.getUser().then(() => {
      this.guideService.getGuides().then((guides) => {
        this.guides = guides;
        this.loading.dismiss();
      });
    });
  }

  getUser() {
    let user = firebase.auth().currentUser;

    return firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
      this.user = snapshot.val();
    });
  }

  isAdmin() {
    return this.user ? this.user.isAdmin : false;
  }

  addGuide() {
    this.navCtrl.push(AddRockstarPage, this.user);
  }

  numComments(guide) {
    return guide.comments ? guide.comments.length : 0;
  }

  numLikes(guide) {
    return guide.likes ? guide.likes.length : 0;
  }

  abbreviatedText(guide) {
    return guide.content.substring(0, 120) + '...';
  }

  timeAgo(guide) {
    return Utils.getSmartDateTimeString(guide.createdOn);
  }

  viewGuide(guide) {
    this.navCtrl.push(ViewRockstarPage, guide);
  }
}
