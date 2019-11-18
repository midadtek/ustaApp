import { Component, OnInit } from '@angular/core';
import { Section, City, Country } from 'src/app/services/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FstoreService } from 'src/app/services/fstore.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.page.html',
  styleUrls: ['./new-company.page.scss'],
})
export class NewCompanyPage implements OnInit {

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

  constructor(private formBuilder: FormBuilder,
    private storage: Storage, public toastController: ToastController, private router: Router,
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
  this.companyReqForm = this.formBuilder.group({
    'fullname': [null, Validators.compose([
      Validators.required
    ])],
    'mobile': [null, Validators.compose([
      Validators.required, Validators.pattern('[0-9 \u0660-\u0669]{10,20}')
    ])],
    'address': [null, Validators.compose([
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
    'address': [null, Validators.compose([
      Validators.nullValidator
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
  
  });
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
  }
  async submitresturantReqForm(value) {
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
  }

}
