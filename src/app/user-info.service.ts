import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type dataType = { fn: string; ln: string; cn: string; ad: string };

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private dataSource = new BehaviorSubject({
    fn: '',
    ln: '',
    cn: '',
    ad: '',
  });
  currentData = this.dataSource.asObservable();

  constructor() {}

  changeData(data: dataType) {
    this.dataSource.next(data);
  }
}
