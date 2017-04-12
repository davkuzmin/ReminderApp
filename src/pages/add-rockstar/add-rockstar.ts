import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { GuideService } from '../../providers/guide-service';
import { UUID } from 'angular2-uuid';
import Utils from '../../app/utils';

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
    base64Image: null,
    youtubeURL: null,
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private guideService: GuideService,
    private camera: Camera,
    private alertCtrl: AlertController,
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

  getVideo() {
    let prompt = this.alertCtrl.create({
      title: 'Add video',
      message: "Enter a youtube video URL into the field below",
      inputs: [
        {
          name: 'url',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: url => {
            if (Utils.validateYouTubeUrl(url)) {
              this.guide.youtubeURL = url;
            } else {
              alert('Invalid URL');
            }
          }
        }
      ]
    });
    prompt.present();
  }

  saveGuide() {
    this.guide.createdOn = new Date().toISOString();
    this.guide.authorId = this.user.uid;

    this.guideService.save(this.guide).then(() => {
      this.navCtrl.pop();
    });
  }
}
