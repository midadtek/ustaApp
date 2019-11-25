import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { map} from 'rxjs/operators';
import { Section, Banner, Country, City, Nationality, SectionLocation, Usta, Rate, Question, Typeofconstruction, NumberOfRooms, years, Fuel, modelsOfCars, Gear, Plate } from './interfaces';
import {formatDate } from '@angular/common';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FstoreService {
  constructor(private afs: AngularFirestore) { }
  getSections() {
    return this.afs.collection<Section>('services', ref => ref.orderBy('order', "asc")).get();
  }

  checkin(){
    let current = formatDate(new Date(),'dd-MM-yyyy','en-US', '+03')    
    this.afs.collection('reportings').doc(current)
  .update({"counter" : firebase.firestore.FieldValue.increment(1)})
  .catch((error) => {
    // console.log('Error updating user', error); // (document does not exists)
    this.afs.collection('reportings').doc(`${current}`)
      .set({"counter" : 1});
  });
  }
  // banners
  getBanners(){
    return this.afs.collection<Banner>('banners', ref => ref.where('active', '==', true)).get();
  }
  getcountries(){
    return this.afs.collection<Country>('countries', ref => ref.where('active', '==', true)).get();
  }
  getcities(id) {
    return this.afs.collection<Country>('countries').doc(id).collection<City>("cities").get();
  }
  getNationalities(): Observable<Nationality[]> {
    return this.afs.collection<Nationality>('nationality').snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getSubSections(sid){
    return this.afs.collection<Section>('services').doc(sid).collection('sub_services').get()
  }
  getSectionLocation(sectionid, locationid): Observable<SectionLocation[]> {
    return this.afs.collection<SectionLocation>("sectionLocation", ref => ref.where('sectionId', '==', sectionid).where('locationId', '==', locationid)).snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  // ustas
  // getUstas(sectionId){
  //   return this.afs.collection<Usta>("ustas", ref => ref.where('sectionIds', 'array-contains', sectionId).where('active', '==', true).orderBy("img_profile","desc")).get();
  // }

  // ustas
  getUstas(sectionid,countryid,sub_section,lastusta:Usta){

    return this.afs.collection<Usta>('ustas', ref => {   
    if(lastusta){
      if(countryid == undefined && sub_section == undefined){
        return ref.where('sectionid', '==', sectionid).where('active', '==', true).orderBy("img_profile","desc").startAfter(lastusta.img_profile).limit(5);
          }
          else if(countryid !=undefined && sub_section==undefined){
            return ref.where('sectionid','==',sectionid).where('countryid','==',countryid).where('active', '==', true).orderBy("img_profile","desc").startAfter(lastusta.img_profile).limit(5);
          }
          else  if(sub_section!=undefined && countryid==undefined){          
           return ref.where('sectionid','==',sectionid).where('subservicesid','array-contains',sub_section).where('active', '==', true).orderBy("img_profile","desc").startAfter(lastusta.img_profile).limit(5);
          }
          else if(sub_section!=undefined && countryid !=undefined ){        
            return ref.where('sectionid','==',sectionid).where('subservicesid','array-contains',sub_section).where('countryid','==',countryid).where('active', '==', true).orderBy("img_profile","desc").startAfter(lastusta.img_profile).limit(5);
          }
    }else{
      if(countryid==undefined && sub_section == undefined){
    return ref.where('sectionid', '==', sectionid).where('active', '==', true).orderBy("img_profile","desc").limit(5);
      }
      else if(countryid !=undefined && sub_section==undefined){
      return ref.where('sectionid','==',sectionid).where('countryid','==',countryid).where('active', '==', true).orderBy("img_profile","desc").limit(5);
      }
      else  if(sub_section!=undefined && countryid==undefined){      
       return ref.where('sectionid','==',sectionid).where('subservicesid','array-contains',sub_section).where('active', '==', true).orderBy("img_profile","desc").limit(5);
      }
        else if(sub_section!=undefined && countryid !=undefined ){
          return ref.where('sectionid','==',sectionid).where('subservicesid','array-contains',sub_section).where('countryid','==',countryid).where('active', '==', true).orderBy("img_profile","desc").limit(5);
        } 
      }
      }).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }
    getustas(){
      return this.afs.collection<Usta>('ustas').snapshotChanges().pipe(
        map(action=>{
          return action.map(a=>{
            const data=a.payload.doc.data();
            const id=a.payload.doc.id;
            return{id,...data}
          })
        })
      )
    }
  getUstaProfile(id) {
    return this.afs.collection<Usta>('ustas').doc<Usta>(id).valueChanges();
  }
  getUstaSection(id) {
    return this.afs.collection<Section>('services').doc<Section>(id).valueChanges();
  }
  getUstaWithId(id: string): Observable<Usta> {
    return this.afs.collection<Usta>('ustas').doc<Usta>(id).valueChanges().pipe(
      map(usta => {
        usta.id = id;
        return usta
      })
    );
  }
  getUstaRate(id): Observable<Rate[]> {
    return this.afs.collection<Rate>('rating', ref => ref.where('ustaId', '==', id).where('active', '==', true).orderBy('created_at', "desc")).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  rateUsta(rate_value: number, id: string) {
    return this.afs.collection<Usta>('ustas').doc<Usta>(id).update({ ustarate: rate_value });
  }
  addRate(ustarate: Rate) {
    return this.afs.collection<Rate>('ratingRequest').add(ustarate);
  }
  addCallingUsta(id) {
    var ustaRef = this.afs.firestore.doc('ustas/' + id);
    var transaction = this.afs.firestore.runTransaction(t => {
      return t.get(ustaRef)
        .then(doc => {
          if (doc.data().callingNum) {
            var newcallingNum = doc.data().callingNum + 1;
            t.update(ustaRef, { callingNum: newcallingNum });
          } else {
            t.update(ustaRef, { callingNum: 1 });
          }
        });
    });
  }
  updateUstaRate(ustarate: number, id: string) {
    var ustaRef = this.afs.firestore.doc('ustas/' + id);
    var transaction = this.afs.firestore.runTransaction(t => {
      return t.get(ustaRef)
        .then(doc => {
          if (doc.data().ustarate) {
            var newRate = Math.floor((doc.data().ustarate + ustarate) / 2);
            t.update(ustaRef, { ustarate: newRate });
          } else {
            t.update(ustaRef, { ustarate: ustarate });
          }
        });
    }).then(result => {
    }).catch(err => {
    });
  }
  ustaRequest(request) {
    let locationid = []
    if(request.locations){
      request.locations.forEach(element => {
        locationid.push(element.id)
      });
    }
    request.locationCode = locationid;
    let sectionIds=[request.sections.id]
    if(request.sections){
      request.sectionIds = sectionIds
      delete request.sections
    }
    
    request.name = request.fullname;
    request.ustadate = new Date();
    request.readed = false;
    request.active = false;
    return this.afs.collection<Request>("ustaRequest").add(request);
  }
  companyRequest(request) {
    let locationid = []
    if(request.locations){
      request.locations.forEach(element => {
        locationid.push(element.id)
      });
    }
    request.locationCode = locationid;
    let sectionIds=[request.sections.id]
    if(request.sections){
      request.sectionIds = sectionIds
      delete request.sections
    }
    request.name = request.fullname;
    request.ustadate = new Date();
    request.readed = false;
    request.sex="company"
    request.active=false
    return this.afs.collection<Request>("companyRequest").add(request);
  }
  resturantRequest(request) {
    let locationid = []
    if(request.locations){
      request.locations.forEach(element => {
        locationid.push(element.id)
      });
    }
    request.locationCode = locationid;  
    let sectionIds=["lQhp1nvbxO56DWe2BF4c"]
    request.sectionIds = sectionIds
    request.name = request.fullname;
    request.ustadate = new Date();
    request.readed = false;
    request.sex="resturant"
    request.active=false
    return this.afs.collection<Request>("resturantRequest").add(request);
  }
  housesRequest(request) {
    
    let locationid = []
    if(request.locations){
      request.locations.forEach(element => {
        locationid.push(element.id)
      });
    }
    request.locationCode = locationid;
    let sectionIds=["yCncXQlblutGpU8YlbjW"]
    request.sectionIds = sectionIds
    request.name = request.fullname;
    request.ustadate = new Date();
    request.readed = false;
    request.sex="houses"
    request.active=false
    request.img_profile=""
    console.log(request)
    return this.afs.collection<Request>("housesRequests").add(request);
  }
  carsRequest(request) {
    let locationid = []
    if(request.locations){
      request.locations.forEach(element => {
        locationid.push(element.id)
      });
    }
    request.locationCode = locationid;
    let sectionIds=["X8YhOaNVHSBsje3DjM3w"]
    request.sectionIds = sectionIds
    request.name = request.fullname;
    request.ustadate = new Date();
    request.readed = false;
    request.sex="cars"
    request.active=false
    request.img_profile=""
    console.log(request)
    return this.afs.collection<Request>("carsRequests").add(request);
  }
  stuffsRequest(request) {
    let locationid = []
    if(request.locations){
      request.locations.forEach(element => {
        locationid.push(element.id)
      });
    }
    request.locationCode = locationid;
    let sectionIds=["XF0nvOlqe0kiGR3badlt"]
    request.sectionIds = sectionIds
    request.name = request.fullname;
    request.ustadate = new Date();
    request.readed = false;
    request.sex="stuffs"
    request.active=false
    request.img_profile=""
    console.log(request)
    return this.afs.collection<Request>("stuffsRequests").add(request);
  }
  getsubservices(cid:string){
    return this.afs.collection('services').doc(cid).collection('sub_services').get();
  }
  contaUs(message){
    return this.afs.collection("contactUs").add(message);
  }
  getAskedQuestion(): Observable<Question[]> {
    return this.afs.collection<Question>('question').snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getTypeofContruction(){
    return this.afs.collection<Typeofconstruction>('Typeofconstruction').get();
  }
  getNumberOfRoom(){
    return this.afs.collection<NumberOfRooms>('NumberOfRooms',ref=>{return ref.orderBy("order","desc")}).get();
  }
  getfuel(){
    return this.afs.collection<Fuel>('Fuel').get();
  }
  getdate(){
    return this.afs.collection<years>('Dates', ref => ref.orderBy('year','desc')).get();
  }
  getModels(){
    return this.afs.collection<modelsOfCars>('modelsOfCars').get();
  }
  getGear(){
    return this.afs.collection<Gear>('Gear').get();
  }
  getPlate(){
    return this.afs.collection<Plate>('Plate').get();
  }
}
