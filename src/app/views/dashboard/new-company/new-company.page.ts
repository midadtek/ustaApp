import { Component, OnInit } from '@angular/core';
import { Section, City, Country, subservices } from 'src/app/services/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FstoreService } from 'src/app/services/fstore.service';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File} from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import {IonSlides} from'@ionic/angular';
import { ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';





@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.page.html',
  styleUrls: ['./new-company.page.scss'],
})
export class NewCompanyPage implements OnInit {
  @ViewChild('slides', {static: false}) slides: IonSlides;

  customActionSheetOptions: any = {}
  customPopoverOptions: any = {
    header: 'البلدية',
    message: 'حدد البلدية التي تعمل فيها'
  };
  max:number=10;
  showLocation
  contactForm : FormGroup;
  companyReqForm : FormGroup;
  resturantReqForm : FormGroup;
  ustaReqForm : FormGroup;
  cities: City[]
  services: Section[]
  ustaservice: Section[]
  companyservice: Section[]
  active: boolean = false
  activeCity:boolean = false
  countries:any[]
  companyIds=['4TRI4w7NCIcuMtxySXix', 'QgfSghbyU5QdJFvDFMuo'];
  request_segment: string = 'resturant';
  gallery:any[]=[];
  profile:any[]=[];
  companysubservice: subservices[]
  resturantsubservice: subservices[]
  latitude=null
  longitude=null

  constructor(private formBuilder: FormBuilder, private afStorage:AngularFireStorage,private geolocation: Geolocation,
    private storage: Storage, public toastController: ToastController, private router: Router,
    private camera:Camera,public file:File,
    private db:FstoreService, private loadingController: LoadingController) { }

  ngOnInit() {

 
    this.db.getcountries().subscribe(res => {
      this.countries = res.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as Country;
    })
  })

  this.db.getSections().subscribe((snapshot) =>{
    this.ustaservice = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as Section;
        }).filter(f => {
          if (f.ustacount > 0 && this.companyIds.indexOf(f.id) == -1  ) {
            return true;
          }
        });
        this.companyservice = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as Section;
        }).filter(f => {
          if (this.companyIds.indexOf(f.id) != -1  ) {
            return true;
          }
        });
  })
  this.db.getsubservices("4TRI4w7NCIcuMtxySXix").subscribe(data => {
    this.companysubservice = data.docs.map(e => {
      return {
        //id:e.id,
        ...e.data(), id: e.id
      } as subservices
    })
  })
  this.db.getsubservices("lQhp1nvbxO56DWe2BF4c").subscribe(data => {
    this.resturantsubservice = data.docs.map(e => {
      return {
        //id:e.id,
        ...e.data(), id: e.id
      } as subservices
    })
  })
  this.companyReqForm = this.formBuilder.group({
    'fullname': [null, Validators.compose([
      Validators.required
    ])],
    'mobile': [null, Validators.compose([
      Validators.required, Validators.pattern('[0-9 \u0660-\u0669]{10,20}')
    ])],
    'whatsappmobile': [null, Validators.compose([
      Validators.required, Validators.pattern('[0-9 \u0660-\u0669]{10,20}')
    ])],
    'address': [null, Validators.compose([
      Validators.nullValidator
    ])],
    'email': [null, Validators.compose([
      Validators.nullValidator
    ])],
    'social': [null, Validators.compose([
      Validators.nullValidator
    ])], 
    'typecompany': [null, Validators.compose([
      Validators.nullValidator
    ])],
    'workday': [null, Validators.compose([
      Validators.nullValidator
    ])],
    'description':[null, Validators.compose([
      Validators.required
    ])],
    'locations': [null, Validators.compose([
      Validators.required
    ])],
     'country': [null, Validators.compose([
      Validators.required
    ])],
    'subservices': [null, Validators.compose([
      Validators.required
    ])],
    'sections': [null, Validators.compose([
      Validators.required
    ])]
  });

  this.resturantReqForm = this.formBuilder.group({
    'fullname': [null, Validators.compose([
      Validators.required
    ])],
    'mobile': [null, Validators.compose([
      Validators.required, Validators.pattern('[0-9 \u0660-\u0669]{10,20}')
    ])],
    'whatsappmobile': [null, Validators.compose([
      Validators.required, Validators.pattern('[0-9 \u0660-\u0669]{10,20}')
    ])],
    'address': [null, Validators.compose([
      Validators.required
    ])],
    'email': [null, Validators.compose([
      Validators.nullValidator
    ])],
    'social': [null, Validators.compose([
      Validators.nullValidator
    ])], 
    'description':[null, Validators.compose([
      Validators.required
    ])],
    'resturantmenu': [null, Validators.compose([
      Validators.nullValidator
    ])],
    'resturantfeatures': [null, Validators.compose([
      Validators.nullValidator
    ])],
    
    'paymentby':[null, Validators.compose([
      Validators.nullValidator
    ])],
    'locations': [null, Validators.compose([
      Validators.required
    ])],
     'country': [null, Validators.compose([
      Validators.required
    ])],
    'subservices': [null, Validators.compose([
      Validators.required
    ])],
  
  });
  }
  
  next() {
    this.slides.lockSwipes(false);

     this.slides.slideNext();
     this.slides.lockSwipes(true);

   }
 
   prev() {
    this.slides.lockSwipes(false);

     this.slides.slidePrev();
     this.slides.lockSwipes(true);

   }
   ionViewWillEnter() {
    this.slides.lockSwipes(true);

  }
  onSelectChange(ev) {
    if(ev.detail.value != ''){
      this.db.getcities(ev.detail.value.id).subscribe(res => {
        this.cities = res.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as City;
      }).sort((a: City, b: City) =>{ try{return a.title_ar < b.title_ar ? -1 : 1}catch{}})
      this.showLocation = true;
    });
    }
  }
  async submitcompanyReqForm(value) {
    value.hash_type=""
    value.longitude=this.longitude
    value.latitude=this.latitude
    value.img_gallery=[]
        this.gallery.forEach(element => {
         value.img_gallery.push(element)
       });

       
       this.profile.forEach(element => {
        value.img_profile=element
      });
    
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    let dateNumber = Math.floor(Date.now() / 864000);
    this.storage.get('requestLimit').then(async (val) => {
      if (val == null || dateNumber > val) {
        this.db.companyRequest(value)
        setTimeout(async () => {
          const toast = await this.toastController.create({
            message: '<p style="text-align: center">شكرا لانضمامك معنا سوف نتواصل معك في أقرب وقت</p>',
            duration: 4000
          });
          toast.present();
          this.companyReqForm.reset();
          loading.dismiss();
          this.router.navigateByUrl('/dashboard');
      }, 1000);
        this.storage.set('requestLimit', dateNumber + 1)
      }
      else{
        let newVal = val + 1
        this.storage.set('requestLimit', newVal)
        if (val < dateNumber + 3) {
          this.db.companyRequest(value)
          setTimeout(async () => {
            const toast = await this.toastController.create({
              message: '<p style="text-align: center">شكرا لانضمامك معنا سوف نتواصل معك في أقرب وقت</p>',
              duration: 4000
            });
            toast.present();
            this.companyReqForm.reset();
            loading.dismiss();
            this.router.navigateByUrl('/dashboard');
        }, 1000);
        } else {
          setTimeout(async () => {
            const toast = await this.toastController.create({
              message: ' تجاوزت عدد مرات الطلبات  في اليوم',
              duration: 4000
            });
            toast.present();
            this.companyReqForm.reset();
            loading.dismiss();
            this.router.navigateByUrl('/sections');
        }, 1000);
        }
      }

    })
    this.gallery=[]
    this.profile=[]
  }
  async submitresturantReqForm(value) {
    
    value.img_gallery=[]
    value.longitude=this.longitude
    value.latitude=this.latitude
    this.gallery.forEach(element => {
     value.img_gallery.push(element)
   });
  

  this.profile.forEach(element => {
   value.img_profile=element
 
  })
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    let dateNumber = Math.floor(Date.now() / 864000);
    this.storage.get('requestLimit').then(async (val) => {
      if (val == null || dateNumber > val) {
        this.db.resturantRequest(value)
        setTimeout(async () => {
          const toast = await this.toastController.create({
            message: '<p style="text-align: center">شكرا لانضمامك معنا سوف نتواصل معك في أقرب وقت</p>',
            duration: 4000
          });
          toast.present();
          this.resturantReqForm.reset();
          loading.dismiss();
          this.router.navigateByUrl('/dashboard');
      }, 1000);
        this.storage.set('requestLimit', dateNumber + 1)
      }
      else{
        let newVal = val + 1
        this.storage.set('requestLimit', newVal)
        if (val < dateNumber + 3) {
          this.db.resturantRequest(value)
          setTimeout(async () => {
            const toast = await this.toastController.create({
              message: '<p style="text-align: center">شكرا لانضمامك معنا سوف نتواصل معك في أقرب وقت</p>',
              duration: 4000
            });
            toast.present();
            this.resturantReqForm.reset();
            loading.dismiss();
            this.router.navigateByUrl('/dashboard');
        }, 1000);
        } else {
          setTimeout(async () => {
            const toast = await this.toastController.create({
              message: ' تجاوزت عدد مرات الطلبات  في اليوم',
              duration: 4000
            });
            toast.present();
            this.resturantReqForm.reset();
            loading.dismiss();
            this.router.navigateByUrl('/dashboard');
        }, 1000);
        }
      }
    }
    )
    this.gallery=[]
    this.profile=[]
  }
  async openProfileResturantRequests(){
      
    let options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.FILE_URI,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    };
  
  
    try{
  
      const fileUri:string=await this.camera.getPicture(options);
  
      let file:string
  
      file=fileUri.substring(fileUri.lastIndexOf('/')+1,fileUri.indexOf('?'))
  
      const path:string=fileUri.substring(0,fileUri.lastIndexOf('/'));
  
  
      const buffer:ArrayBuffer=await this.file.readAsArrayBuffer(path,file)
      const blob:Blob= new Blob([buffer],{type:"image/jpeg"});
  
      this.uploadprofilepicture(blob,'resturantsRequests/');
    }catch{
      alert("error")
    }
  }
  async openGalleryResturantRequests(){
      
    let options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.FILE_URI,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    };
  
  
    try{
  
      const fileUri:string=await this.camera.getPicture(options);
  
      let file:string
  
      file=fileUri.substring(fileUri.lastIndexOf('/')+1,fileUri.indexOf('?'))
  
      const path:string=fileUri.substring(0,fileUri.lastIndexOf('/'));
  
  
      const buffer:ArrayBuffer=await this.file.readAsArrayBuffer(path,file)
      const blob:Blob= new Blob([buffer],{type:"image/jpeg"});
  
      this.uploadgallerypicture(blob,'resturantsRequests/');
    }catch{
      alert("error")
    }
  }
  async openProfileCompanyRequests(){
      
    let options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.FILE_URI,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    };
  
  
    try{
  
      const fileUri:string=await this.camera.getPicture(options);
  
      let file:string
  
      file=fileUri.substring(fileUri.lastIndexOf('/')+1,fileUri.indexOf('?'))
  
      const path:string=fileUri.substring(0,fileUri.lastIndexOf('/'));
  
  
      const buffer:ArrayBuffer=await this.file.readAsArrayBuffer(path,file)
      const blob:Blob= new Blob([buffer],{type:"image/jpeg"});
  
      this.uploadprofilepicture(blob,'companiesRequests/');
    }catch{
      alert("error")
    }
  }
  async openGalleryCompanyRequests(){
      
    let options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.FILE_URI,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
    };
  
  
    try{
  
      const fileUri:string=await this.camera.getPicture(options);
  
      let file:string
  
      file=fileUri.substring(fileUri.lastIndexOf('/')+1,fileUri.indexOf('?'))
  
      const path:string=fileUri.substring(0,fileUri.lastIndexOf('/'));
  
  
      const buffer:ArrayBuffer=await this.file.readAsArrayBuffer(path,file)
      const blob:Blob= new Blob([buffer],{type:"image/jpeg"});
  
      this.uploadgallerypicture(blob,'companiesRequests/');
    }catch{
      alert("error")
    }
  }
  uploadgallerypicture(blob:Blob,type){
    
    const randomId = Math.random().toString(36).substring(2);
    
    const ref=this.afStorage.ref(`${type}/${randomId}`)
    const task=ref.put(blob).then(uploadSnapshot=>{
      
      uploadSnapshot.ref.getDownloadURL().then((downloadur)=>{
        this.gallery.push(downloadur)
      })
      
    })
   
  }
  uploadprofilepicture(blob:Blob,type){
  
    const randomId = Math.random().toString(36).substring(2);
    
    const ref=this.afStorage.ref(`${type}/${randomId}`)
    const task=ref.put(blob).then(uploadSnapshot=>{
      
      uploadSnapshot.ref.getDownloadURL().then((downloadur)=>{
        this.profile.push(downloadur)
      })
      
    })
  
  
  
  
   
  }
  deletegalleryimg(item){
    
 
    var arr=this.gallery.indexOf(item);
    this.gallery.splice(arr,1)
       
       }
  deleteprofileimg(item){
    
 
        var arr=this.profile.indexOf(item);
        this.profile.splice(arr,1)
           
   }
   getCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }
}

  

