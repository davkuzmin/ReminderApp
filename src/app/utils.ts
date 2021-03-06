export default class Utils {
    static ObjToArray(val: Object): any[] {
      var res = [];

      Object.keys(val || []).forEach((key) => {
        res.push(val[key]);
      });

      return res;
    }

    static getSocialMediaIcon(type: string[]) {
      let icon = type[0].toLowerCase();

      if (type.length > 1 || icon == "other") { //multiple types
        return 'star';
      } else {
        switch(icon) {
          case 'google+':
            return 'logo-googleplus';
          case 'twitter':
            return 'logo-twitter';
          case 'facebook':
            return 'logo-facebook';
          case 'instagram':
            return 'logo-instagram';
        }
      }
    }

    //returns current datetime in ISOstring format offset for the current timezone
    static getOffsetISOString(date?: Date) {
      let milliseconds = date ? date.getTime() : Date.now();
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      return (new Date(milliseconds - tzoffset)).toISOString().slice(0,-1);
    }

    //returns Date object from the resulting string of the getOffsetISOString function
    static getDateFromOffsetISOString(offsetISO: string) {
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      return new Date(Date.parse(offsetISO) + tzoffset);
    }

    static getTimeStringFromDate(date: Date): string {
      return date.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
    }

    static arrayDiff(a: Array<any>, b: Array<any>): Array<any> {
      return a.filter(x => b.indexOf(x) < 0);
    }

    static getSmartDateTimeString(dateTimeISO: string) {
      let dateTime = new Date(dateTimeISO);
      let now = new Date();

      let difference = now.valueOf() - dateTime.valueOf();
      let seconds = Math.trunc(difference / 1000);
      let minutes = Math.trunc(seconds / 60);
      let hours = Math.trunc(minutes / 60);
      let days = Math.trunc(hours / 24);

      if (Math.abs(seconds) < 10) {
        return "Just now";
      } else if (seconds < 60) {
        return seconds + ' seconds';
      } else if (minutes < 60) {
        return minutes == 1 ? minutes + ' minute' : minutes + ' minutes';
      } else if (hours < 24) {
        return hours == 1 ? hours + ' hour' : hours + ' hours';
      } else if (days < 7) {
        return days == 1 ? days + ' day' : days + ' days';
      } else {
        return dateTime.getMonth() + '/' + dateTime.getDate() + '/' + dateTime.getFullYear();
      }
    }

    static formatDate(dateTimeISO: string) {
      let dateTime = new Date(dateTimeISO);
      return dateTime.getMonth() + '/' + dateTime.getDate() + '/' + dateTime.getFullYear();
    }

    static validateYouTubeUrl(url: string) {
      let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      return regExp.test(url);
    }

    static getYoutubeEmbedLink(url: string): string {
      return 'https://www.youtube.com/embed/' + Utils.getYoutubeVideoId(url);
    }

    static getYoutubeVideoId(link: string): string {
        let url = link.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
          return url[2].split(/[^0-9a-z_\-]/i)[0];
        }
        else {
          return url[0];
        }
    }

    static getNumberFromString(str: string): number {
      return parseInt(str.match(/\d+/g).join(''));
    }
}
