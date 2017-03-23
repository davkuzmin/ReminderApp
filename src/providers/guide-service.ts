import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

@Injectable()
export class GuideService {

  constructor(public http: Http, private storage: Storage) {
    storage.ready().then(() => {
      //TODO store guides in Storage
    });
  }

  public fetch(): Promise<any> {
    return new Promise(resolve => {
      this.http.get('https://baconipsum.com/api/?type=meat-and-filler')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
}
