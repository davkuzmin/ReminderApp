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
    return firebase.database().ref('guides').once('value').then(snapshot => {
      return Utils.ObjToArray(snapshot.val());
    });
  }

  public save(guide): firebase.Promise<any> {
    return firebase.database().ref('guides/' + guide.id).set(guide);
  }
}
