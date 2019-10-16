import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { map} from 'rxjs/operators';
import { Section, Banner, Country, City, Nationality, SectionLocation, Usta, Rate, Question } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class FstoreService {
  constructor(private afs: AngularFirestore) { }
  getSections() {
    return this.afs.collection<Section>('services', ref => ref.orderBy('order', "asc")).get();
  }
  // banners
  getBanners(): Observable<Banner[]> {
    return this.afs.collection<Banner>('banners', ref => ref.where('active', '==', true)).snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
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
  getUstas(sectionId){
    return this.afs.collection<Usta>("ustas", ref => ref.where('sectionIds', 'array-contains', sectionId).where('active', '==', true).orderBy("img_profile","desc")).get();
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
}
