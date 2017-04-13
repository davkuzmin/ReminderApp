import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-how-to',
  templateUrl: 'how-to.html'
})
export class HowToPage {

	guides = [

	{
		title:"Why It's Important to Create YOUR Brand:" , description: "Grow your social media presence, grow your business. Become follow-worthy. Create your rockstar status. Attain visibility. Learn to stand out from the crowd. Share your skills and talents. Step into your light.People don't want to be sold on social media, they desire to connect and build relationships. They want to hear your struggles and challenges and how you've overcome them. They want to know how you've solved your problems because they are dealing with similar life experiences. People want solutions to their every day issues. You can become the tour guide to a different way of being and doing. You can inspire, lift up, promote positivity and provide hope. Share the benefits of your products or services NOT the latest incentive to buy or join, not the ingredients list, not WHY your products are better than XYZ!! Share how your life has been impacted. How they've helped you. However, you can't just do it one time a week on social media. You must show up in peoples' feeds every darn day. You have to grab their attention. And you must also do it in a genuine and authentic way. They are always watching, even if they don't click like or leave a comment. I have seen this played out over and over again in my social media presence. (Great example, people stop me in the grocery store to tell me they see my posts and watch my videos. However, I've NEVER seen them leave a comment!)This is long term thinking. It takes weeks and months to build your brand. Even if you've made the decision to create a new business and are committed to the process, it still takes time for people to decide if you are going to stick this out for the long haul. Most people know you in one light so when you start moving into a new way of doing things, it may surprise some of them. But keep going. Don't stop to please other people and their expectations of what you should be doing. As you pivot and grow, you will lose some people along the way. That's ok. It's normal. It's your growth. Don't project your needs onto them. Just stay the course and keep your eye on the prize, whatever that is for you."
	},
	{
		title:"Grow Yourself, Grow Your Brand:", description: "I'd also like to suggest a plan of personal growth and development as you begin to create or re-create your brand. Truly knowing yourself will help you serve and help others. Books, podcasts, coaching groups, etc. Commit to at least 20 minutes a day of personal growth and development. And when you grow yourself, why not share what you're learing on social media? Learn something new, teach it!"
	},
	{
		title:"Social Media is Important:", description: "Social media is the best FREE marketing tool out there. Facebook is the number one SM platform with billions of users. Facebook is updating and creating new products and services all the time. I believe it's the best social media platform to make new friends, grow relationships, connect with others and showcase your brand. (Please Note- These principles can appy to other social media platforms, yet I choose Facebook as my number one platform. I also believe you should not move on to another social media platform until you have 'mastered' one.)The key to building your brand and getting visible is CONSISTENCY. Posting on Facebook 3-5 times a day is a great formula for gaining exposure. Think about this: People log on to Facebook dozens of times a day. When they log on, you want your posts to be number one in their feeds. You want them to see you all the time. How do you get high on their feeds? You add value to their lives so they want to engage with you. You also in turn, give engagement on their posts. When you come from a place of wanting to help others, you will reach your goals. You just need to get consistent with good content. You need to figure out what you're passionate about. And you need to share it."
	},
	{
		title:"Attract People to You:", description: "Learning to attract your ideal customer/client to you takes time along with testing out your messages. First and foremost, who is your ideal customer? Connecting with him/her on an emotional level is the best way to attract him/her to you.I recommend figuring out what your highest values are and sharing from your heart. For example, I am passionate about creatively making a difference in the lives of others, my family, taking responsibility for my actions, health and wellness, being authentic and congruent and having fun! Now, as I start to share more of my values, I may repel some people. But that's ok. I don't want them joining me as a customer or business partner anyways! (You want high quality, low maintenance people as customers and partners. Go getters, achievers, motivated to succeed, optimistic, hopeful, etc.)Eventually you will have people reaching out and asking you “what do you do?” This is awesome! This means they are following you, gain value from your posts, find your credible and trustworthy and believe you can help them! But it doesn't happen overnight. Yet with consistency of actions, adding value, reaching out, connecting and being a HUMAN, you can create a raving fan base."

	},
	{
		title:"Connect with People and Grow Relationships:", description: "Connect and Interact with 3,5,10, 15 people a day (pick your number, the higher the number, the faster your potential success).Interact with people without expecting a sale. Eventually, when timing is right, it may make sense to bring up your product or service. I believe you can get so good with your brand that people will come to you and ask YOU what you do. Be a HUMAN. Have chats on messenger. No 'commission breath'! Use the voice recorder in Messenger. It's rare people receive a voice message. It is an awesome way to go the extra mile. Comment on posts that genuinely resonate with you. Appreciate people. Show your gratitude. Commenting on posts and in groups, is like handing out your business card. Be of value where you can be. When you add value, you could gain a new friend or follower."
	}

	]



  constructor(public navCtrl: NavController) {

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
}
