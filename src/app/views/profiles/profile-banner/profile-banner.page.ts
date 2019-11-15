import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.page.html',
  styleUrls: ['./profile-banner.page.scss'],
})
export class ProfileBannerPage implements OnInit {
  banner: []
  ib:string
  i:number
  ptime: number
  timerId
  counter = 100
  constructor( private modalCtr: ModalController) { }
  ngOnInit() {
    clearTimeout(this.timerId);
    this.ib = this.banner[this.i]
    this.i++
    this.ptime = 1;
    this.StartTimer();
  }
  StartTimer() {
    this.timerId = setTimeout(() => {
      if (this.counter <= 0) { }
      this.counter -= 1;
      this.ptime -= 0.01;
      if (this.counter > 0) {
        this.StartTimer();
      }
      else {
        if (this.i < this.banner.length) {
          this.counter = 100
          this.StartTimer();
          this.ib = this.banner[this.i]
          this.i++
          this.ptime = 1
        } else {
          clearTimeout(this.timerId);
          this.modalCtr.dismiss();
        }
      }
    }, 100);
  }
  next() {
    if (this.i < this.banner.length) {
      clearTimeout(this.timerId);
      this.counter = 100
      this.StartTimer();
      this.ib = this.banner[this.i]
      this.i++
      this.ptime = 1
    } else {
      clearTimeout(this.timerId);
      this.modalCtr.dismiss();
    }
  }
  close() {
    this.modalCtr.dismiss();
  }
}
