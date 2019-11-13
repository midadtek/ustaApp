import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FirebasedbService, Usta, City, Nationality, Country, SubSection } from '../../services/firebasedb.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-filter-ustas',
  templateUrl: './filter-ustas.page.html',
  styleUrls: ['./filter-ustas.page.scss'],
})
export class FilterUstasPage implements OnInit {
  sectionid
  customActionSheetOptions: any = {};
  cities:any[]
  countries: Country[]
  subSections;
  filtered_city;
  filtered_country;
  filtered_subSection;
  constructor(private storage: Storage, private modalCtr: ModalController,
    private fbSrv: FirebasedbService, private navParams: NavParams) { }
  ionViewWillEnter() {
    let filter_affect = this.navParams.get('filter_affect');
    this.sectionid = this.navParams.get('sectionid');
    if (filter_affect) {
      this.filtered_city = filter_affect.filtered_city
      this.filtered_country = filter_affect.filtered_country
      this.filtered_subSection = filter_affect.filtered_subSection
    }
  }
  ngOnInit() {
    this.fbSrv.getSubSections(this.sectionid).subscribe((snapshot) => {
      this.subSections = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as SubSection;
      });
    })
    this.fbSrv.getcountries().subscribe(res => {
      this.countries = res.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as Country;
      });
    })
  }
  onSelectChange(ev) {
    this.fbSrv.getcities(ev.detail.value).subscribe(res => {
      this.cities = res.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as City;
    }).sort((a: City, b: City) =>{ try{return a.title_ar < b.title_ar ? -1 : 1}catch{}})
    // this.cities.push({id:'',title_ar:'تحديد الكل',title_tr:'',lat:'0',lon:'0'})

  });
  }
  filter() {
    let result: any = {}
    if (this.filtered_city ) {
        result.filtered_city = this.filtered_city
    }
    if (this.filtered_country) {
      result.filtered_country = this.filtered_country
    }
    if (this.filtered_subSection) result.filtered_subSection = this.filtered_subSection
    this.modalCtr.dismiss(result);
  }
  cancel() {
    this.modalCtr.dismiss();
  }
  cancelFilter(){
    let result: any = {}
        result.filtered_city = null
      result.filtered_country = null
    result.filtered_subSection = null
    this.modalCtr.dismiss(result);
  }
}
