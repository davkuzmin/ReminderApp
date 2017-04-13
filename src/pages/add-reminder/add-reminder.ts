import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { NotificationService } from '../../providers/notification-service';
import { ToastService } from '../../providers/toast-service';
import Utils from '../../app/utils';
import { UUID } from 'angular2-uuid';

import firebase from 'firebase';

@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html',
})
export class AddReminder {
  private categories = ["Inspirational", "Motivational", "Lifestyle", "Family", "Fun", "Hobbies", "Ask a Question", "Product/Service", "Personal Story", "Business"];
  private types = ["Facebook", "Instagram", "Twitter", "Google+", "Other"];
  private medias = ["Text Only", "Image/Meme", "Video"];

  public reminder = {
    id: UUID.UUID(),
    datetime: '',
    category: this.categories[0],
    type: [this.types[0]],
    media: this.medias[0],
    notes: '',
    notified: false
  };

guides = [
{
title: "Inspirational/Motivational", description: "Most people will react positively to an inspirational/motivational post. The key is to put your personal spin on it. Share a few lines of how YOU make meaning out of the post (if you're sharing a quote or meme). You can find inspiration/motivation anywhere. You have to keep your eyes and ears open to it! Chances are you will get some good engagement on this type of post."
},
{
title: "Lifestyle/Fun/Family/Pets/Hobbies " , description: "What happens when you post a picture of your kids, family or pets? You probably get a lot of likes and comments! This is super helpful for your algorithm! Share your life. Share your hobbies. Whatever you're into, share it! I highly recommend adding a picture along with your post. Here are few ideas to get you thinking...kids, pets, clothes, food, hobbies, nature, whatever you love."
},
{
title: "Ask a Question", description: " This type of post can be a huge boost to your algorithm. Create engagement by asking for recommendations, tips, advice, suggestions, favorite ___, etc. Engagement is great for your algorithm. Be sure to give engagement too."
},
{
title: "Product/Service Related", description: "When it comes to posting about your products/service, you want to share the benefits of how the product/service has impacted your life. (Don't focus on what your products are made of, or how they are produced). Focus on how the product/service will make your customers feel and why they will be helpful or benefical for them. Interest will follow once people trust you as a reliable and trustworthy expert. Once they trust you, sales will follow."
},
{
title: "Personal Story", description: " When you share a personal story, you can get engagement. The key is to share how you've overcome a challenge and the solution that you found. This is where you can really start to stand out from the crowd. People love stories, especially if they can relate. The goal is to build relationships and connections when sharing your stories. When people find you relatable, they feel they can reach out and ask you questions. They feel connected to you. They feel you can help them with their own struggles and challenges. Imagine people messaging you daily asking for your help in solving their problems!?!?"
},
{
title: "Business Related", description: "Instead of sharing your business opportunity like a salesperson (i.e. 'I'm looking for 3 people to join my team....,' or 'Make $444444444 when you join me....'), try sharing what the opportunities have allowed you to do or create. For example, show your gratitude for the extra income you are bringing in nowadays which allows you to pay for more family experiences! If you aren't making money yet, borrow a friend's story. Remember, this is long term thinking. It's not a get rich quick scheme. Building your business will take time and that means that you may not bring in any income for a little while. That's ok, that's business!"
}
]


  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private notifications: NotificationService,
    private toaster: ToastService,
  ) {
    this.reminder.datetime = Utils.getOffsetISOString();
  }

  saveReminder() {
    let user = firebase.auth().currentUser;

    if (this.isValidDate(this.reminder.datetime)) {
      firebase.database().ref('users/' + user.uid + '/reminders/' + this.reminder.id).set(this.reminder).then(() => {
        this.notifications.scheduleNotification(this.reminder);
        this.toaster.makeToast(this.reminder.type + ' reminder added');
        this.navCtrl.pop();
      }).catch(err => {
        this.toaster.makeToast(err.message);
      });
    } else {
      this.toaster.makeToast("Invalid date or time! Select a future date or time");
    }
  }

  isValidDate(isoDateString: string) {
    return Utils.getDateFromOffsetISOString(isoDateString) > new Date();
  }

  shownGroup = null;

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
};
isGroupShown(group) {
    return this.shownGroup === group;
};

getSocialMediaIcon(type: string[]) {
  return Utils.getSocialMediaIcon(type);
}



}
