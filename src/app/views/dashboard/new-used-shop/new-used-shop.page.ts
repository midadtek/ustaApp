import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { City, Section, subservices
  , Typeofconstruction, NumberOfRooms, Country, modelsOfCars, years, Fuel, Plate, Gear } from 'src/app/services/interfaces';
import { ToastController, LoadingController } from '@ionic/angular';
import { FstoreService } from 'src/app/services/fstore.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File} from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import {IonSlides} from'@ionic/angular';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-new-used-shop',
  templateUrl: './new-used-shop.page.html',
  styleUrls: ['./new-used-shop.page.scss'],
})
export class NewUsedShopPage implements OnInit {
  @ViewChild('slides', {static: false}) slides: IonSlides;


  public uploadPercent:Observable<number>
  public downloadUrl:Observable<string>
  images=[]
  customActionSheetOptions: any = {}
  customPopoverOptions: any = {
    header: 'البلدية',
    message: 'حدد البلدية التي تعمل فيها'
  };
  max:number=10;
  showLocation
  contactForm : FormGroup;
  housesRequests:FormGroup
  carsRequests:FormGroup
  stuffsRequests:FormGroup

  cities: City[]
  services: Section[]
  ustaservice: Section[]
  companyservice: Section[]
  active: boolean = false
  activeCity:boolean = false
  countries:any[]
  subservice: subservices[]
  housesubservice: subservices[]
 stuffsubservice: subservices[]
 carsubservice: subservices[]
  typeOfconstruction:Typeofconstruction[]
  numberOfRooms:NumberOfRooms[]
  img_list;
  photos:any[]=[];
  uploadstatus:string
  captureDataUrl: string;
  modelofcar:modelsOfCars[]
  year:years[]
  fuel:Fuel[]
  plate:Plate[]
  gear:Gear[]
  @Input('useURI') useURI: Boolean = true;

  downloadURL: Observable<string>
  request_segment: string = 'houses'
  constructor(private formBuilder: FormBuilder,public file:File,
    private afStorage:AngularFireStorage, private storage: Storage, public toastController: ToastController, private router: Router,private camera:Camera,
    private db: FstoreService, private loadingController: LoadingController) { }
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
          });
          this.companyservice = snapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            } as Section;
          })
    })
    this.housesRequests=this.formBuilder.group({
      'fullname': [null, Validators.compose([
        Validators.required
      ])],
      'mobile': [null, Validators.compose([
        Validators.required, Validators.pattern('[0-9 \u0660-\u0669]{10,20}')
      ])],
      'whatsappmobile': [null, Validators.compose([
        Validators.nullValidator
      ])],
    
      'country': [null, Validators.compose([
        Validators.required
      ])],
      'locations': [null, Validators.compose([
        Validators.required
      ])],
      'price': [null, Validators.compose([
        Validators.required
      ])],
      'space': [null, Validators.compose([
        Validators.required
      ])],
      'ageOfconstruction': [null, Validators.compose([
        Validators.required
      ])],
      'numberOfRooms': [null, Validators.compose([
        Validators.required
      ])],
      'numberOfBathrooms': [null, Validators.compose([
        Validators.required
      ])],
      
      'theNumberOfFloors': [null, Validators.compose([
        Validators.required
      ])],
      'floorNumber': [null, Validators.compose([
        Validators.required
      ])],
      'numberOfBalconies': [null, Validators.compose([
        Validators.required
      ])],
      'periodicExpenses': [null, Validators.compose([
        Validators.required
      ])],
      'lift': [null, Validators.compose([
        Validators.required
      ])],
      'deposit': [null, Validators.compose([
        Validators.required
      ])],
      'withinTheComplex': [null, Validators.compose([
        Validators.required
      ])],

      'Furnished': [null, Validators.compose([
        Validators.required
      ])],

      'subservices': [null, Validators.compose([
        Validators.required
      ])],

      'typeOfconstruction': [null, Validators.compose([
        Validators.required
      ])],
      
      'social': [null, Validators.compose([
        Validators.nullValidator
      ])],
      'address': [null, Validators.compose([
        Validators.required
      ])],
      'description':[null, Validators.compose([
        Validators.nullValidator
      ])],
    }); 
    this.carsRequests=this.formBuilder.group({
      'fullname': [null, Validators.compose([
        Validators.required
      ])],
      'mobile': [null, Validators.compose([
        Validators.required, Validators.pattern('[0-9 \u0660-\u0669]{10,20}')
      ])],
      'whatsappmobile': [null, Validators.compose([
        Validators.nullValidator
      ])],
    
      'country': [null, Validators.compose([
        Validators.required
      ])],
      'locations': [null, Validators.compose([
        Validators.required
      ])],
      'price': [null, Validators.compose([
        Validators.required
      ])],
      'Enginetype': [null, Validators.compose([
        Validators.required
      ])],
      'year': [null, Validators.compose([
        Validators.required
      ])],
      'color': [null, Validators.compose([
        Validators.required
      ])],
      'Counternumber': [null, Validators.compose([
        Validators.required
      ])],
      'fuel': [null, Validators.compose([
        Validators.required
      ])],
      'enginePower': [null, Validators.compose([
        Validators.required
      ])],
      'plate': [null, Validators.compose([
        Validators.required
      ])],
      'gear': [null, Validators.compose([
        Validators.required
      ])],
      'subservices': [null, Validators.compose([
        Validators.required
      ])],
      
      'social': [null, Validators.compose([
        Validators.nullValidator
      ])],
      'address': [null, Validators.compose([
        Validators.required
      ])],
      'modelOfCar': [null, Validators.compose([
        Validators.required
      ])],
      
      'description':[null, Validators.compose([
        Validators.nullValidator
      ])],
      
      
     
    }); 
    this.stuffsRequests=this.formBuilder.group({
      'fullname': [null, Validators.compose([
        Validators.required
      ])],
      'mobile': [null, Validators.compose([
        Validators.required, Validators.pattern('[0-9 \u0660-\u0669]{10,20}')
      ])],
      'whatsappmobile': [null, Validators.compose([
        Validators.nullValidator
      ])],
    
      'country': [null, Validators.compose([
        Validators.required
      ])],
      'locations': [null, Validators.compose([
        Validators.required
      ])],
      'price': [null, Validators.compose([
        Validators.required
      ])],
      'Delivery': [null, Validators.compose([
        Validators.required
      ])],
      
      'subservices': [null, Validators.compose([
        Validators.required
      ])],
      
      'social': [null, Validators.compose([
        Validators.nullValidator
      ])],
      'address': [null, Validators.compose([
        Validators.required
      ])],
     
    
      'description':[null, Validators.compose([
        Validators.nullValidator
      ])],
      
      
     
    }); 
    this.db.getsubservices("yCncXQlblutGpU8YlbjW").subscribe(data => {
          this.housesubservice = data.docs.map(e => {
            return {
              //id:e.id,
              ...e.data(), id: e.id
            } as subservices
          })
        })

    this.db.getsubservices("XF0nvOlqe0kiGR3badlt").subscribe(data => {
          this.stuffsubservice = data.docs.map(e => {
            return {
              //id:e.id,
              ...e.data(), id: e.id
            } as subservices
          })
        })
        this.db.getsubservices("X8YhOaNVHSBsje3DjM3w").subscribe(data => {
          this.carsubservice = data.docs.map(e => {
            return {
              //id:e.id,
              ...e.data(), id: e.id
            } as subservices
          })
        })

        this.db.getTypeofContruction().subscribe(data => {
          this.typeOfconstruction = data.docs.map(e => {
            return {
              //id:e.id,
              ...e.data(), id: e.id
            } as Typeofconstruction
          })
        })
        this.db.getNumberOfRoom().subscribe(data => {
          this.numberOfRooms = data.docs.map(e => {
            return {
              //id:e.id,
              ...e.data(), id: e.id
            } as NumberOfRooms
          })
        })
        this.db.getModels().subscribe(data => {
          this.modelofcar = data.docs.map(e => {
            return {
              //id:e.id,
              ...e.data(), id: e.id
            } as modelsOfCars
          })
        })

        this.db.getdate().subscribe(data => {
          this.year = data.docs.map(e => {
            return {
              //id:e.id,
              ...e.data(), id: e.id
            } as years
          })
        })
        
        this.db.getfuel().subscribe(data => {
          this.fuel = data.docs.map(e => {
            return {
              //id:e.id,
              ...e.data(), id: e.id
            } as Fuel
          })
        })

        this.db.getPlate().subscribe(data => {
          this.plate = data.docs.map(e => {
            return {
              //id:e.id,
              ...e.data(), id: e.id
            } as Plate
          })
        })
        this.db.getGear().subscribe(data => {
          this.gear = data.docs.map(e => {
            return {
              //id:e.id,
              ...e.data(), id: e.id
            } as Gear
          })
        })

    
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
      this.showLocation = true
    });
    }
    
  }
  deleteimg(item){
    
 
    var arr=this.photos.indexOf(item);
    this.photos.splice(arr,1)
       
       }
       next() {
         this.slides.slideNext();
       }
     
       prev() {
         this.slides.slidePrev();
       }
       async submithousesReqForm(value) {
        value.img_gallery=[]
        this.photos.forEach(element => {
         value.img_gallery.push(element)
       });
       if(value.whatsappmobile==null){
        value.whatsappmobile=""
      }
      if(value.social==null){
       value.social=""
     }
     if(value.description==null){
       value.description=""
     }
        const loading = await this.loadingController.create({
          spinner: 'lines-small'
        });
        await loading.present();
        
        let dateNumber = Math.floor(Date.now() / 864000);
        
        this.storage.get('requestLimit').then(async (val) => {
          if (val == null || dateNumber > val) {
            // this.db.addhouses(this.img_list,'ustas_gallery',value) .then(() => {
            //   this.img_list = null
            // })
           
            
            this.db.housesRequest(value)
    
            setTimeout(async () => {
              const toast = await this.toastController.create({
                message: '<p style="text-align: center">شكرا لانضمامك معنا سوف يتم نشر عقارك في أقرب وقت</p>',
                duration: 4000
              });
              toast.present();
              this.housesRequests.reset();
              loading.dismiss();
              this.router.navigateByUrl('/dashboard');
          }, 1000);
            this.storage.set('requestLimit', dateNumber + 1)
          }
          else{
            let newVal = val + 1
            this.storage.set('requestLimit', newVal)
            if (val < dateNumber + 3) {
              this.db.housesRequest(value)
              setTimeout(async () => {
                const toast = await this.toastController.create({
                  message: '<p style="text-align: center">شكرا لانضمامك سوف يتم نشر عقارك في أقرب وقت</p>',
                  duration: 4000
                });
                toast.present();
                this.housesRequests.reset();
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
                this.housesRequests.reset();
                loading.dismiss();
                this.router.navigateByUrl('/dashboard');
            }, 1000);
            }
          }
        })
        this.photos=[]
        
      }
      async submitcarsReqForm(value) {
        value.img_gallery=[]
        this.photos.forEach(element => {
         value.img_gallery.push(element)
       });
       if(value.whatsappmobile==null){
         value.whatsappmobile=""
       }
       if(value.social==null){
        value.social=""
      }
      if(value.description==null){
        value.description=""
      }
        const loading = await this.loadingController.create({
          spinner: 'lines-small'
        });
        await loading.present();
        
        let dateNumber = Math.floor(Date.now() / 864000);
        
        this.storage.get('requestLimit').then(async (val) => {
          if (val == null || dateNumber > val) {
            // this.db.addCars(this.img_list,'ustas_gallery',value) .then(() => {
            //   this.img_list = null
            // })
    
            this.db.carsRequest(value)
    
            setTimeout(async () => {
              const toast = await this.toastController.create({
                message: '<p style="text-align: center">شكرا لانضمامك معنا سوف يتم نشر السيارة في أقرب وقت</p>',
                duration: 4000
              });
              toast.present();
              this.carsRequests.reset();
              loading.dismiss();
              this.router.navigateByUrl('/dashboard');
          }, 1000);
            this.storage.set('requestLimit', dateNumber + 1)
          }
          else{
            let newVal = val + 1
            this.storage.set('requestLimit', newVal)
            if (val < dateNumber + 3) {
              this.db.carsRequest(value)
              setTimeout(async () => {
                const toast = await this.toastController.create({
                  message: '<p style="text-align: center">شكرا لانضمامك معنا سوف يتم نشر السيارة في أقرب وقت</p>',
                  duration: 4000
                });
                toast.present();
                this.carsRequests.reset();
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
                this.carsRequests.reset();
                loading.dismiss();
                this.router.navigateByUrl('/dashboard');
            }, 1000);
            }
          }
        })
        this.photos=[]
    
      }
      
      async submitstuffReqForm(value) {
        value.img_gallery=[]
        this.photos.forEach(element => {
         value.img_gallery.push(element)
       });
       if(value.whatsappmobile==null){
        value.whatsappmobile=""
      }
      if(value.social==null){
       value.social=""
     }
     if(value.description==null){
       value.description=""
     }
        const loading = await this.loadingController.create({
          spinner: 'lines-small'
        });
        await loading.present();
        
        let dateNumber = Math.floor(Date.now() / 864000);
        
        this.storage.get('requestLimit').then(async (val) => {
          if (val == null || dateNumber > val) {
            // this.db.addStuffs(this.img_list,'ustas_gallery',value) .then(() => {
            //   this.img_list = null
            // })
    
            this.db.stuffsRequest(value)
    
            setTimeout(async () => {
              const toast = await this.toastController.create({
                message: '<p style="text-align: center">شكرا لانضمامك معنا سوف يتم نشر منتجك في أقرب وقت</p>',
                duration: 4000
              });
              toast.present();
              this.stuffsRequests.reset();
              loading.dismiss();
              this.router.navigateByUrl('/dashboard');
          }, 1000);
            this.storage.set('requestLimit', dateNumber + 1)
          }
          else{
            let newVal = val + 1
            this.storage.set('requestLimit', newVal)
            if (val < dateNumber + 3) {
              this.db.stuffsRequest(value)
              setTimeout(async () => {
                const toast = await this.toastController.create({
                  message: '<p style="text-align: center">شكرا لانضمامك معنا سوف يتم نشر منتجك في أقرب وقت</p>',
                  duration: 4000
                });
                toast.present();
                this.stuffsRequests.reset();
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
                this.stuffsRequests.reset();
                loading.dismiss();
                this.router.navigateByUrl('/dashboard');
            }, 1000);
            }
          }
        })
        this.photos=[]
      }
    async openGalleryhousesRequests(){
      
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
    
        this.uploadpicture(blob,'housesRequests/');
      }catch{
        alert("error")
      }
    }
    async openGallerycarsRequests(){
      
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
    
        this.uploadpicture(blob,'carsRequests/');
      }catch{
        alert("error")
      }
    }
    async openGallerystuffsRequests(){
      
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
    
        this.uploadpicture(blob,'stuffsRequests/');
      }catch{
        alert("error")
      }
    }
    uploadpicture(blob:Blob,type){
    
      const randomId = Math.random().toString(36).substring(2);
      
      const ref=this.afStorage.ref(`${type}/${randomId}`)
      const task=ref.put(blob).then(uploadSnapshot=>{
        
        uploadSnapshot.ref.getDownloadURL().then((downloadur)=>{
          this.photos.push(downloadur)
        })
        
      })
    
    
    
    
     
    }
   
}
