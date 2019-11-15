import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

profile

  constructor( private popoverCtr: PopoverController,
    ) { }

  ngOnInit() {
    this.profile

  }
  close(){
    this.popoverCtr.dismiss()

  }

}
