import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, LoadingController, NavParams } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { FstoreService } from 'src/app/services/fstore.service';
import { Usta } from 'src/app/services/interfaces';



@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class resultsPage implements OnInit {

  name
  searchTerm
  pagedUstas: Usta[];
  uid
  sectionid
  constructor(private clipboard:Clipboard,private fstore: FstoreService,
    private modalCtr: ModalController,private navParams:NavParams, public toastController: ToastController,private loadingController:LoadingController) { }

  async ngOnInit() {
    this.name=this.navParams.get('name');
    this.searchTerm=this.navParams.get('searchTerm');
    this.loadusta();
   
  

  }
  async loadusta(){
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
     loading.present();
     if(this.name=="name"){
      this.fstore.getustasbyname(this.searchTerm).subscribe(snapshot =>{
        this.pagedUstas= snapshot;
        snapshot.forEach(r=>{
this.uid=r.id
this.sectionid=r.sectionid
        })
        console.log(snapshot)
  
        loading.dismiss();
      });
      
      
     
      console.log(this.searchTerm)
     }
     else if(this.name=="mobile"){
      this.fstore.getustasbymobile(this.searchTerm).subscribe(snapshot =>{
        this.pagedUstas= snapshot;
        snapshot.forEach(r=>{
          this.uid=r.id
          this.sectionid=r.sectionid
                  })
        console.log(snapshot)
  
        loading.dismiss();
      });
      
      
     
      console.log(this.searchTerm)
     }
     else if(this.name=="hash_id"){
      let hash= Number(this.searchTerm)
      this.fstore.getustasbyhashId(hash).subscribe(snapshot =>{
        this.pagedUstas= snapshot;
        snapshot.forEach(r=>{
          this.uid=r.id
          this.sectionid=r.sectionid
                  })
        console.log(snapshot)
  
        loading.dismiss();
      });
      
      
     
      console.log(this.searchTerm)
     }
 

  }
  clickToprofile(){
    let result: any = {}
    if (this.uid ) {
        result.uid = this.uid
        result.sectionid=this.sectionid
    }
    this.modalCtr.dismiss(result);

  }

  

}
   
