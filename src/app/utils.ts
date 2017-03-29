export default class Utils {
    static ObjToArray(val: Object) {
      var res = [];

      Object.keys(val || []).forEach((key) => {
        res.push(val[key]);
      });

      return res;
    }

    static getSocialMediaIcon(type: any) {
      if (type instanceof Array) { //multiple types
        return 'star'
      } else {
        switch(type.toLowerCase()) {
          case 'google+':
            return 'logo-googleplus';
          case 'twitter':
            return 'logo-twitter';
          case 'facebook':
            return 'logo-facebook';
        }
      }
    }

    //returns current datetime in ISOstring format offset for the current timezone
    static getOffsetISOString() {
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      return (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
    }

    //returns Date object from the resulting string of the getOffsetISOString function
    static getDateFromOffsetISOString(offsetISO: string) {
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      return new Date(Date.parse(offsetISO) + tzoffset);
    }

    static getTimeStringFromDate(date: Date): string {
      return date.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
    }
}
