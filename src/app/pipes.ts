import { Pipe } from '@angular/core';
import Utils from './utils';

@Pipe({
  name: 'offsetISODate'
})
export class OffsetISODate {
  transform(value) {
    return Utils.getDateFromOffsetISOString(value);
  }
}
