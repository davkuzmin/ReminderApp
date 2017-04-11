import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { GuideService } from '../../providers/guide-service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'page-add-rockstar',
  templateUrl: 'add-rockstar.html',
  providers: [GuideService, Camera],
})
export class AddRockstarPage {
  private user: any;
  private guide = {
    id: UUID.UUID(),
    authorId : null,
    title: "",
    content: "",
    comments: [],
    likes: 0,
    createdOn: null,
    base64Image: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private guideService: GuideService,
    private camera: Camera,
  ) {
    this.user = this.navParams.data;
  }

  getPicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }).then(data => {
      this.guide.base64Image = "data:image/jpeg;base64," + data;
    });
  }

  saveGuide() {
    this.guide.createdOn = new Date().toISOString();
    this.guide.authorId = this.user.uid;

    this.guideService.save(this.guide).then(() => {
      this.navCtrl.pop();
    });
  }
}
