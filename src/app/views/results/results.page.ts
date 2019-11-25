import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, LoadingController, NavParams } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';



@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class resultsPage implements OnInit {

  ustaF
  constructor(private clipboard:Clipboard,
    private modalCtr: ModalController,private navParams:NavParams, public toastController: ToastController,private loadingController:LoadingController) { }

  ngOnInit() {
 

    this.ustaF=this.navParams.get('usta');
    console.log(this.ustaF)
  }

  

}
  
