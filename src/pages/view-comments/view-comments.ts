import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { GuideService } from '../../providers/guide-service';
import { UserService } from '../../providers/user-service';

import firebase from 'firebase';

import Utils from '../../app/utils';

@Component({
  selector: 'page-view-comments',
  templateUrl: 'view-comments.html'
})
export class ViewCommentsPage {
  private loading;

  private guide;
  private comments: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private guideService: GuideService,
    private userService: UserService,
    private alertCtrl: AlertController,
  ) {
    let self = this;
    this.loading = this.loadingCtrl.create({
      content: 'Loading comments...'
    });
    this.loading.present();

    this.guide = this.navParams.data;

    firebase.database().ref('guides-data/' + this.guide.id + '/comments').on('value', (snapshot) => {
      let comments =  Utils.ObjToArray(snapshot.val());
      this.comments = comments;
      this.loading.dismiss();
    });

    // firebase.database().ref('guides-data/' + this.guide.id + '/comments').on('child_added', (snapshot) => {
    //   let comment = snapshot.val();
    //   if (comment) {
    //     self.comments.push(comment);
    //   }
    //   self.loading.dismiss();
    // });
    //
    // firebase.database().ref('guides-data/' + this.guide.id + '/comments').on('child_removed', (snapshot) => {
    //   let comment = snapshot.val();
    //   if (comment) {
    //     this.comments = this.comments.filter(o => {
    //       return o.id != comment.id;
    //     });
    //   }
    // });
  }

  addComment() {
    let prompt = this.alertCtrl.create({
      title: 'Comment',
      message: "Enter your comment below",
      inputs: [
        {
          name: 'comment',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Post',
          handler: res => {
            this.userService.getCurrentUser().then(user => {
              let newComment = {
                text: res.comment,
                date: new Date().toISOString(),
                authorId: user.uid,
                authorName: user.displayName,
              };

              this.postComment(newComment, this.guide.id);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  postComment(comment, guideId) {
    firebase.database().ref('guides-data/' + guideId + '/comments').push(comment).then(() => {
      //alert('Comment saved');
    });
  }
}
