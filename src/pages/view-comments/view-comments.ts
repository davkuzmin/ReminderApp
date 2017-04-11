import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { GuideService } from '../../providers/guide-service';

import Utils from '../../app/utils';

@Component({
  selector: 'page-view-comments',
  templateUrl: 'view-comments.html'
})
export class ViewCommentsPage {
  private loading;

  private guideId = null;
  private guideTitle = "";
  private comments = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private guideService: GuideService,
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Loading comments...'
    });
    this.loading.present();

    this.guideId = this.navParams.data.guideId;
    this.guideTitle = this.navParams.data.guideTitle;

    this.guideService.getComments(this.guideId).then(comments => {
      this.comments = comments;
      this.loading.dismiss();
    });
  }


}
