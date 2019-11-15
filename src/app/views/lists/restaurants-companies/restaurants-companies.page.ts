import { Component, OnInit, ViewChild } from '@angular/core';
import { FstoreService } from 'src/app/services/fstore.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ModalController, PopoverController, IonInfiniteScroll } from '@ionic/angular';
import { Country, SubSection, Usta } from 'src/app/services/interfaces';
import { FilterComponent } from 'src/app/components/filter/filter.component';
@Component({
  selector: 'app-restaurants-companies',
  templateUrl: './restaurants-companies.page.html',
  styleUrls: ['./restaurants-companies.page.scss'],
})
export class RestaurantsCompaniesPage implements OnInit {

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
    console.log(this.sectionid)
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
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    this.fbSrv.getUstas(this.sectionid , this.filteredCountry , this.filterdSubSection , null).subscribe(snapshot =>{
      this.orgUstas = this.pagedUstas= snapshot;
      console.log(this.pagedUstas)
      this.lastUsta = snapshot[snapshot.length - 1];
      loading.dismiss();
    });
    this.fbSrv.getUstaSection(this.sectionid).subscribe(res => {
      this.sections = res.section
    })
  }
  // async order() {
  //   const popover = await this.popoverCtr.create({
  //     component: OrderUstasPage
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
  //       this.pagedUstas = this.orgUstas
  //       this.order_affect = arrange.data;
  //     } else {
  //       this.order_affect = null;
  //     }
  //   }
  //   });
  // }
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
    if(data){
    if (data.filtered_city) {
      tempUsta = tempUsta.filter(usta => { try{return usta.locationCode.indexOf(data.filtered_city.id) > -1 }catch{}})
    }
    if (data.filtered_country) {
      tempUsta = tempUsta.filter(usta => { try{return usta.country.id ===data.filtered_country }catch{}})
    } 
    if (data.filtered_numberOfRooms) {
      tempUsta = tempUsta.filter(usta => { try{return usta.numberOfRooms.room === data.filtered_numberOfRooms }catch{}})
  
    }
    if (data.filtered_typeOfconstruction) {
      tempUsta = tempUsta.filter(usta => { try{return usta.typeOfconstruction.title_ar === data.filtered_typeOfconstruction }catch{}})

    }
    if (data.filtered_deposit) {
      tempUsta = tempUsta.filter(usta => { try{return usta.deposit === data.filtered_deposit }catch{}})

    }
    if (data.filtered_furnished) {
      tempUsta = tempUsta.filter(usta => { try{return usta.Furnished === data.filtered_furnished }catch{}})

    }
    if (data.filtered_lift) {
      tempUsta = tempUsta.filter(usta => { try{return usta.lift === data.filtered_lift }catch{}})

    }
    if (data.filtered_periodicExpenses) {
      tempUsta = tempUsta.filter(usta => { try{return usta.periodicExpenses === data.filtered_periodicExpenses }catch{}})

    }
    if (data.filtered_withinTheComplex) {
      tempUsta = tempUsta.filter(usta => { try{return usta.withinTheComplex === data.filtered_withinTheComplex }catch{}})
    }

    if (data.filtered_fuel){
      tempUsta = tempUsta.filter(usta => {try {return usta.fuel.title_ar ===data.filtered_fuel; }catch {}});
    }
    if (data.filtered_date){
      tempUsta = tempUsta.filter(usta => {try {return usta.year.year ===data.filtered_date; }catch {}});
    }
    if (data.filtered_modelsOfCars){
      tempUsta = tempUsta.filter(usta => {try {return usta.modelOfCar.title ===data.filtered_modelsOfCars; }catch {}});
    }
    if (data.filtered_gear){
      tempUsta = tempUsta.filter(usta => {try {return usta.gear.title_ar ===data.filtered_gear; }catch {}});
    }
    if (data.filtered_plate){
      tempUsta = tempUsta.filter(usta => {try {return usta.plate.title_ar ===data.filtered_plate; }catch {}});
    }
    this.pagedUstas = tempUsta;
     this.filter_affec = data;
     loading.dismiss();
    }else{
      this.loadUstas()
    }
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
}
