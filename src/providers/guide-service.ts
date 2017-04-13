import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'rxjs/add/operator/map';

import Utils from '../app/utils';
import { Storage } from '@ionic/storage';

@Injectable()
export class GuideService {

  constructor(
    //private storage: Storage
  ) {
    //storage.ready().then(() => {
      //TODO store guides in Storage
    //});
  }

  public getGuides(): firebase.Promise<any> {
    let guidesPromise = new Promise((resolve, reject) => {
      resolve(firebase.database().ref('guides').once('value').then(snapshot => {
          return Utils.ObjToArray(snapshot.val());
      }));
    });

    let guidesDataPromise = new Promise((resolve, reject) => {
      resolve(firebase.database().ref('guides-data').once('value').then(snapshot => {
          return Utils.ObjToArray(snapshot.val());
      }));
    });

    return Promise.all([guidesPromise, guidesDataPromise]).then((data) => {
      let guides = Utils.ObjToArray(data[0]);
      let guidesData = Utils.ObjToArray(data[1]);
      guidesData.forEach((data, index) => {
        guidesData[index].comments = Utils.ObjToArray(data.comments);
      });

      return guides.map((guide) => {
        let data = guidesData.find(o => {
          return o.id == guide.id;
        }) || {};

        return Object.assign(data, guide);
      });
    });
  }

  public save(guide): firebase.Promise<any> {
    return firebase.database().ref('guides/' + guide.id).set(guide).then(() => {
      return firebase.database().ref('guides-data/' + guide.id).set({
        id: guide.id
      });
    });
  }
}
