import { Component, OnInit, ViewChild } from '@angular/core';
import { FstoreService } from 'src/app/services/fstore.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ModalController, PopoverController, IonInfiniteScroll } from '@ionic/angular';
import { Country, SubSection, Usta } from 'src/app/services/interfaces';
import { FilterComponent } from 'src/app/components/filter/filter.component';
// import { OrderComponent } from 'src/app/components/order/order.component';
@Component({
  selector: 'app-ustas',
  templateUrl: './ustas.page.html',
  styleUrls: ['./ustas.page.scss'],
})
export class UstasPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  countries: Country[];
  subSections;
  sectionid: string;
  pagedUstas: Usta[];
  orgUstas: Usta[];
  lastUsta: Usta;
  closeFilter=false;
  filteredCountry;
  filterdSubSection;
  finishLoading:boolean=false;
  sections;
  order_affect;
  filter_affec;
  searchTerm
  showSearch
  usta:Usta[]

  constructor(private fbSrv: FstoreService, private route: ActivatedRoute,
    private loadingController: LoadingController, public navCtrl: NavController,
     private modalCtr: ModalController, private popoverCtr: PopoverController) { }
  ngOnInit() {
    this.loadUstas();
    this.getCountry();
    this.getSubsection();
  }
  getCountry(){
    this.fbSrv.getcountries().subscribe( res => {
      this.countries = res.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as Country;
      });
  });
  }
  getSubsection(){
    this.fbSrv.getSubSections(this.sectionid).subscribe((snapshot) => {
      this.subSections = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as SubSection;
      });
    });
  }
  Reset(){
    this.pagedUstas=null;
    this.usta=null;
    this.orgUstas=null;

     this.loadUstas();
     this.closeFilter=false
     this.filteredCountry=undefined;
     this.filterdSubSection=undefined;
   }
   async FilterCountry(){
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    this.fbSrv.getUstas(this.sectionid , this.filteredCountry , this.filterdSubSection , null).subscribe(snapshot => {
      this.orgUstas = this.pagedUstas=this.usta = snapshot;
      this.lastUsta = snapshot[snapshot.length - 1];
      loading.dismiss();
    });
    this.closeFilter = true;
   }

   async filterSubSection(){
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    this.fbSrv.getUstas(this.sectionid , this.filteredCountry,this.filterdSubSection , null).subscribe(snapshot => {
      this.orgUstas = this.pagedUstas=this.usta = snapshot;
      this.lastUsta = snapshot[snapshot.length - 1];
      loading.dismiss();
    });
    this.closeFilter = true;
  }

   loadData(event){
    setTimeout(() => {
    this.fbSrv.getUstas(this.sectionid , this.filteredCountry , this.filterdSubSection , this.lastUsta).subscribe(res => {
      if (res.length) {
        this.pagedUstas = this.pagedUstas.concat(res);
        this.lastUsta = res[res.length - 1];
        event.target.complete();
      }
      else{
        event.target.disabled = true;
      }
    });
  }, 500);
   }
   toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  ionViewDidEnter(){
    this.finishLoading = true;
  }
  ionViewWillLeave(){
    this.finishLoading = false;
  }
  async loadUstas() {
    this.sectionid = this.route.snapshot.params['sectionid'];
    if(this.sectionid=="hyVPYQCvLWWKU8Ip7XPg"){
      this.sectionid="2tEx0cDTW08wLuCny7MK";
    }
    if(this.sectionid=="uqtChXQoPuLzQxF7cfal"){
      this.sectionid="2tEx0cDTW08wLuCny7MK";
    }
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    this.fbSrv.getUstas(this.sectionid , this.filteredCountry , this.filterdSubSection , null).subscribe(snapshot =>{
      this.orgUstas = this.pagedUstas= snapshot;
      console.log(snapshot)

      this.lastUsta = snapshot[snapshot.length - 1];
      loading.dismiss();
    });
    this.fbSrv.getUstaSection(this.sectionid).subscribe(res => {
      this.sections = res.section
    })
  }
  
  async openFilter() {
    const modal = await this.modalCtr.create({
      component: FilterComponent,
      componentProps: {
        filter_affect: this.filter_affec,
        sectionid:this.sectionid,
        country:this.filteredCountry,
      }
    });
    modal.present();
    modal.onWillDismiss().then(async filter => {
      if (filter.data) {
        this.filterData(filter.data);
      } else {
        this.filter_affec = null;
        this.loadUstas()
      }
 
    });
  }
  async filterData(data){
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    let tempUsta = this.pagedUstas
    if (data.filtered_city) {
      tempUsta = tempUsta.filter(usta => { try{return usta.locationCode.indexOf(data.filtered_city.id) > -1 }catch{}})
    }
    if (data.filtered_country) {
      tempUsta = tempUsta.filter(usta => { try{return usta.country.id === data.filtered_country }catch{}})
    }
   
    this.pagedUstas = tempUsta;
     this.filter_affec = data;
     loading.dismiss();
  }
  filterustas() {
    console.log(this.searchTerm)
    if (this.searchTerm.length > 1) {
        this.orgUstas = this.pagedUstas.filter(usta =>
          {
            try {
              return ((usta.name.indexOf(this.searchTerm) > -1) ||
             (usta.mobile.indexOf(this.searchTerm) > -1) ||
              (usta.description.indexOf(this.searchTerm) > -1 || (usta.hash_id === this.searchTerm)))
            }
              catch(err){}; 
          }
          )
    } else {
      this.orgUstas = this.usta;
    }
    this.pagedUstas = this.orgUstas;
  }
  // async order() {
  //   const popover = await this.popoverCtr.create({
  //     component: OrderComponent
  //   });
  //   popover.present();
  //   popover.onWillDismiss().then(arrange => {
  //     if(arrange.data){      
  //     if (arrange.data.order_affect) {
  //       switch (arrange.data.order_affect) {
  //         case 'low_rate':
  //           this.orgUstas.sort((a: Usta, b: Usta) =>{ try{return a.ustarate < b.ustarate ? -1 : 1}catch{}})
  //           break;
  //         case 'low_experience':
  //           this.orgUstas.sort((a: Usta, b: Usta) => { try{return a.experienceyear < b.experienceyear ? -1 : 1}catch{}})
  //           break;
  //         case 'high_rate':
  //           this.orgUstas.sort((a: Usta, b: Usta) => { try{return a.ustarate > b.ustarate ? -1 : 1}catch{}})
  //           break;
  //         case 'high_experience':
  //           this.orgUstas.sort((a: Usta, b: Usta) => { try{return a.experienceyear > b.experienceyear ? -1 : 1}catch{}})
  //           break;
  //       }
  //       this.pagedUstas=this.orgUstas
  //       this.order_affect = arrange.data;
  //     } else {
  //       this.order_affect = null;
  //     }
  //   }
  //   });
  // }
}
