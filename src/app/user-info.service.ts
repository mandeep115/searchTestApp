import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type dataType = { fn: string; ln: string; cn: string; ad: string };

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private dataSource = new BehaviorSubject('');
  currentData = this.dataSource.asObservable();

  constructor() {}

  changeData(data: string) {
    this.dataSource.next(data);
  }
}
