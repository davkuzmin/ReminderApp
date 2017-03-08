export default class Utils {
    static ObjToArray(val: Object) {
      var res = [];
      Object.keys(val).forEach((key) => {
        res.push(val[key]);
      });

      return res;
    }

    static getSocialMediaIcon(type: string) {
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
