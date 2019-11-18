import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FstoreService } from 'src/app/services/fstore.service';
import { Country, Section, City } from 'src/app/services/interfaces';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-new-usta',
  templateUrl: './new-usta.page.html',
  styleUrls: ['./new-usta.page.scss'],
})
export class NewUstaPage implements OnInit {

  customActionSheetOptions: any = {}
  customPopoverOptions: any = {
    header: 'البلدية',
    message: 'حدد البلدية التي تعمل فيها'
  };

  countries:any[]
  ustaservice: Section[]
  companyIds=['4TRI4w7NCIcuMtxySXix','lQhp1nvbxO56DWe2BF4c','QgfSghbyU5QdJFvDFMuo']
  ustaReqForm : FormGroup;
  contactForm : FormGroup;

  companyservice: Section[]
  cities: City[]
  max:number=10;
  showLocation



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
            return true
          }
        });
        this.companyservice = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as Section;
        }).filter(f => {
          if (this.companyIds.indexOf(f.id) != -1  ) {
            return true
          }
        });
  })
  
  this.ustaReqForm = this.formBuilder.group({
    'fullname': [null, Validators.compose([
      Validators.required
    ])],
    'mobile': [null, Validators.compose([
      Validators.required, Validators.pattern('[0-9 \u0660-\u0669]{10,20}')
    ])],
    'address': [null, Validators.compose([
      Validators.nullValidator
    ])],
    'sex': [null, Validators.compose([
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

  async submitustaReqForm(value) {
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    value.date = new Date();
    let dateNumber = Math.floor(Date.now() / 864000);
    this.storage.get('requestLimit').then(async (val) => {
      if (val == null || dateNumber > val) {
        this.db.ustaRequest(value)
        setTimeout(async () => {
          const toast = await this.toastController.create({
            message: '<p style="text-align: center">شكرا لانضمامك معنا سوف نتواصل معك في أقرب وقت</p>',
            duration: 4000
          });
          toast.present();
          this.ustaReqForm.reset();
          loading.dismiss();
          this.router.navigateByUrl('/dashboard');
      }, 1000);
        this.storage.set('requestLimit', dateNumber + 1)
      }
      else{
        let newVal = val + 1
        this.storage.set('requestLimit', newVal)
        if (val < dateNumber + this.max) {
          this.db.ustaRequest(value)
          setTimeout(async () => {
            const toast = await this.toastController.create({
              message: '<p style="text-align: center">شكرا لانضمامك معنا سوف نتواصل معك في أقرب وقت</p>',
              duration: 4000
            });
            loading.dismiss();
            this.router.navigateByUrl('/dashboard');
            this.ustaReqForm.reset();
            toast.present();
        }, 1000);
        } else {
          setTimeout(async () => {
            const toast = await this.toastController.create({
              message: ' تجاوزت عدد مرات الطلبات  في اليوم',
              duration: 4000
            });
            toast.present();
            this.ustaReqForm.reset();
            loading.dismiss();
            this.router.navigateByUrl('/dashboard');
        }, 1000);
        }
      }
    })
  }

  

}
