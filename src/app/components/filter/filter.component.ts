import { Component, OnInit } from '@angular/core';
import { Country, SubSection, City, Typeofconstruction, NumberOfRooms, modelsOfCars, years, Fuel, Gear, Plate } from 'src/app/services/interfaces';
import { ModalController, NavParams } from '@ionic/angular';
import { FstoreService } from 'src/app/services/fstore.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  sectionid
  customActionSheetOptions: any = {};
  cities:any[]
  countries: Country[]
  subSections;
  filtered_city;
  filtered_country;
  filtered_typeOfconstruction
  filtered_numberOfRooms
  filtered_deposit
  filtered_furnished
  filtered_lift
  filtered_periodicExpenses
  filtered_withinTheComplex
  typeOfconstruction:Typeofconstruction[]
  numberOfRooms:NumberOfRooms[]

  filtered_fuel;
  filtered_date;
  filtered_modelsOfCars
  filtered_gear
  filtered_plate
  modelsofcars:modelsOfCars[]
  date:years[]
  fuel:Fuel[]
  gear:Gear[]
  plate:Plate[]

  filtered_delivery;

  constructor(private modalCtr: ModalController,
    private fbSrv: FstoreService, private navParams: NavParams) { }

    ionViewWillEnter() {
      let filter_affect = this.navParams.get('filter_affect');
      this.sectionid = this.navParams.get('sectionid');
      this.filtered_country = this.navParams.get('country');
      if (filter_affect) {
        this.filtered_city = filter_affect.filtered_city
        this.filtered_country = filter_affect.filtered_country
        this.filtered_numberOfRooms = filter_affect.filtered_numberOfRooms
      this.filtered_typeOfconstruction = filter_affect.filtered_typeOfconstruction
      this.filtered_deposit = filter_affect.filtered_deposit
      this.filtered_furnished=filter_affect.filtered_furnished
      this.filtered_lift=filter_affect.filtered_lift
      this.filtered_periodicExpenses=filter_affect.filtered_periodicExpenses
      this.filtered_withinTheComplex=filter_affect.filtered_withinTheComplex

      this.filtered_fuel=filter_affect.filtered_fuel
      this.filtered_date=filter_affect.filtered_date
      this.filtered_modelsOfCars=filter_affect.filtered_modelsOfCars
      this.filtered_gear=filter_affect.filtered_gear
      this.filtered_plate=filter_affect.filtered_plate

      this.filtered_delivery = filter_affect.filtered_delivery

      }
    }
  ngOnInit() {

    
    this.fbSrv.getcountries().subscribe(res => {
      this.countries = res.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as Country;
      });
    })
    
    if(this.sectionid=="yCncXQlblutGpU8YlbjW"){
      this.fbSrv.getTypeofContruction().subscribe(res => {
        this.typeOfconstruction = res.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as Typeofconstruction;
        });
      })  
      this.fbSrv.getNumberOfRoom().subscribe(res => {
        this.numberOfRooms = res.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as NumberOfRooms;
        });
      })  
    }
    if(this.sectionid=="X8YhOaNVHSBsje3DjM3w"){
      this.fbSrv.getfuel().subscribe(res=>{
        this.fuel=res.docs.map(doc=>{
          return{
            id:doc.id,
            ...doc.data()
          } as Fuel;
        })
      })
  
      this.fbSrv.getdate().subscribe(res=>{
        this.date=res.docs.map(doc=>{
          return{
            id:doc.id,
            ...doc.data()
          } as years;
        })
      })
  
      this.fbSrv.getModels().subscribe(res=>{
        this.modelsofcars=res.docs.map(doc=>{
          return{
            id:doc.id,
            ...doc.data()
          } as modelsOfCars;
        })
      })
      this.fbSrv.getGear().subscribe(res=>{
        this.gear=res.docs.map(doc=>{
          return{
            id:doc.id,
            ...doc.data()
          } as Gear;
        })
      })
      this.fbSrv.getPlate().subscribe(res=>{
        this.plate=res.docs.map(doc=>{
          return{
            id:doc.id,
            ...doc.data()
          } as Plate;
        })
      })
    }


  }
  onSelectChange(ev) {
    this.fbSrv.getcities(ev.detail.value).subscribe(res => {
      this.cities = res.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as City;
    }).sort((a: City, b: City) =>{ try{return a.title_ar < b.title_ar ? -1 : 1}catch{}})

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
    if (this.filtered_numberOfRooms) {
      result.filtered_numberOfRooms = this.filtered_numberOfRooms
    }
    if (this.filtered_typeOfconstruction) {
      result.filtered_typeOfconstruction = this.filtered_typeOfconstruction
    }
    if (this.filtered_deposit) {
      result.filtered_deposit = this.filtered_deposit
    }
    if (this.filtered_furnished) {
      result.filtered_furnished = this.filtered_furnished
    }
    if (this.filtered_lift) {
      result.filtered_lift = this.filtered_lift
    }
    if (this.filtered_periodicExpenses) {
      result.filtered_periodicExpenses = this.filtered_periodicExpenses
    }
    if (this.filtered_withinTheComplex) {
      result.filtered_withinTheComplex = this.filtered_withinTheComplex
    }
    if(this.filtered_fuel) result.filtered_fuel=this.filtered_fuel

    if(this.filtered_date) result.filtered_date=this.filtered_date

    if(this.filtered_modelsOfCars) result.filtered_modelsOfCars=this.filtered_modelsOfCars
    if(this.filtered_gear) result.filtered_gear=this.filtered_gear
    if(this.filtered_plate) result.filtered_plate=this.filtered_plate
    
    this.modalCtr.dismiss(result);
  }
  cancel() {
    this.modalCtr.dismiss();
  }
  cancelFilter(){
    let result: any = {}
        result.filtered_city = null
      result.filtered_country = null

      result.filtered_numberOfRooms = null
      result.filtered_typeOfconstruction = null
      result.filtered_deposit = null
      result.filtered_furnished = null
      result.filtered_lift = null
      result.filtered_periodicExpenses = null
      result.filtered_withinTheComplex = null

      result.filtered_fuel=null
      result.filtered_date=null
      result.filtered_modelsOfCars=null
      result.filtered_gear=null
      result.filtered_plate=null



      result.filtered_delivery=null


    this.modalCtr.dismiss(result);
  }

}
