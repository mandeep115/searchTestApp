import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserInfoService, dataType } from '../user-info.service';
import { Subscription } from 'rxjs';

const fieldSym = {
  fn: '\\',
  ln: '@',
  cn: '#',
  ad: '$',
};
@Component({
  selector: 'app-user-input-area',
  templateUrl: './user-input-area.component.html',
  styleUrls: ['./user-input-area.component.scss'],
})
export class UserInputAreaComponent implements OnInit, OnDestroy {
  userData!: dataType;
  subscription!: Subscription;

  constructor(private data: UserInfoService) {}
  userInputForm = new FormGroup({
    fn: new FormControl(''),
    ln: new FormControl(''),
    cn: new FormControl(''),
    ad: new FormControl(''),
  });

  onSubmit() {
    this.data.changeData(this.formatSearchStr(this.userInputForm.value));
  }
  formatSearchStr(d: dataType): string {
    let str = '';
    d.fn && (str += `\\${d.fn}`);
    d.ln && (str += `@${d.ln}`);
    d.cn && (str += `#${d.cn}`);
    d.ad && (str += `$${d.ad}`);
    return str;
  }
  ngOnInit() {
    this.subscription = this.data.currentData.subscribe((d) => {
      this.userData = this.stringHelper(d);
      this.userInputForm.setValue(this.userData);
    });
  }
  stringHelper(s: string): dataType {
    let d = {
      fn: '',
      ln: '',
      cn: '',
      ad: '',
    };
    let so = {
      fn: s.indexOf('\\'),
      ln: s.indexOf('@'),
      cn: s.indexOf('#'),
      ad: s.indexOf('$'),
    };
    d.fn = this.help('fn', s, so);
    d.ln = this.help('ln', s, so);
    d.cn = this.help('cn', s, so);
    d.ad = this.help('ad', s, so);
    return d;
  }

  help(
    dt: 'fn' | 'ln' | 'cn' | 'ad',
    s: string,
    so: { fn: number; ln: number; cn: number; ad: number }
  ) {
    console.log(s[s.length - 1]);
    let val = '';
    if (['\\', '@', '#', '$'].includes(s[s.length - 1])) {
      if (s[s.length - 1] === fieldSym[dt]) {
        console.log(dt);
        return '';
      } else {
        return this.userData[dt];
      }
    }
    if (so[dt] !== -1) {
      let ni = s.slice(so[dt] + 1, s.length).match(/[\\@#$]/)?.index;
      if (!ni) {
        ni = s.length;
        val = s.slice(so[dt] + 1, ni);
      } else {
        val = s.slice(so[dt] + 1, ni + so[dt] + 1);
      }
    } else {
      val = '';
    }
    return val;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

// export class UserInputAreaComponent implements OnInit {
//   userInputForm!: FormGroup;
//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.userInputForm = this.fb.group({
//       // fn: ['qs', [Validators.name, Validators.required]],
//       // ln: ['', [Validators.name, Validators.required]],
//       // cn: [null, [Validators.required]],
//       // ad: ['', [Validators.required]],
//       fn: '',
//       ln: '',
//       cn: null,
//       ad: '',
//     });
//   }
//   // get fn() {
//   //   return this.userInputForm.get('fn');
//   // }
//   // get ln() {
//   //   return this.userInputForm.get('ln');
//   // }
//   // get cn() {
//   //   return this.userInputForm.get('cn');
//   // }
//   // get ad() {
//   //   return this.userInputForm.get('ad');
//   // }
// }
