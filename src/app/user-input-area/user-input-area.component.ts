import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserInfoService, dataType } from '../user-info.service';
import { Subscription } from 'rxjs';

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
    this.data.changeData(this.userInputForm.value);
  }
  ngOnInit() {
    this.subscription = this.data.currentData.subscribe((d) => {
      this.userData = d;
      this.userInputForm.setValue(d);
    });
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
