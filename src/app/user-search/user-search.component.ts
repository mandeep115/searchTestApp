import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { dataType, UserInfoService } from '../user-info.service';
/*
  \ First Name
  @ Last Name
  # Chart Number
  $ Address
*/
@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {
  subscription!: Subscription;
  userSearchForm = new FormGroup({
    searchStr: new FormControl(''),
  });

  constructor(private data: UserInfoService) {}

  // help(
  //   dt: 'fn' | 'ln' | 'cn' | 'ad',
  //   s: string,
  //   so: { fn: number; ln: number; cn: number; ad: number }
  // ) {
  //   console.log(s[s.length - 1]);
  //   if (['\\', '@', '#', '$'].includes(s[s.length - 1])) {
  //     return;
  //   }
  //   if (so[dt] !== -1) {
  //     let ni = s.slice(so[dt] + 1, s.length).match(/[\\@#$]/)?.index;
  //     if (!ni) {
  //       ni = s.length;
  //       this.userData[dt] = s.slice(so[dt] + 1, ni);
  //     } else {
  //       this.userData[dt] = s.slice(so[dt] + 1, ni + so[dt] + 1);
  //     }
  //   } else {
  //     this.userData[dt] = '';
  //   }
  //   this.data.changeData(this.userData);
  // }
  onInput() {
    this.data.changeData(this.userSearchForm.value.searchStr);
  }
  // onInput() {
  //   let temp: string = this.userSearchForm.value.searchStr;
  //   let so = {
  //     fn: temp.indexOf('\\'),
  //     ln: temp.indexOf('@'),
  //     cn: temp.indexOf('#'),
  //     ad: temp.indexOf('$'),
  //   };
  //   console.log(so);
  //   this.help('fn', temp, so);
  //   this.help('ln', temp, so);
  //   this.help('cn', temp, so);
  //   this.help('ad', temp, so);
  //   // console.log(this.userSearchForm.value);
  // }
  ngOnInit() {
    this.subscription = this.data.currentData.subscribe((d) => {
      console.log(d);
      // this.userData = d;
      this.userSearchForm.controls['searchStr'].setValue(
        d
        // this.formatSearchStr(d)
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
