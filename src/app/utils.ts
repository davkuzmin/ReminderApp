export default class Utils {
    static ObjToArray(val: Object) {
      var res = [];
      Object.keys(val).forEach((key) => {
        res.push(val[key]);  
      });

      return res;
    }
}
