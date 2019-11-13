import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  FstoreService } from 'src/app/services/fstore.service';
import { Country } from 'src/app/services/interfaces';
import { ToastController, LoadingController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  contactForm: FormGroup;
  active: boolean = false
  max:number=10;
  constructor(private formBuilder: FormBuilder, public toastController: ToastController,private router: Router,
     private db: FstoreService, private loadingController: LoadingController) { }
  ngOnInit() {


    this.contactForm = this.formBuilder.group({
      'Name': [null, Validators.compose([
        Validators.required
      ])],
      'Mobile': [null, Validators.compose([
        Validators.required, Validators.pattern('[0-9 \u0660-\u0669]{10,20}')
      ])],
      'message': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

   async submitForm(form_value) {
    const loading = await this.loadingController.create({spinner: 'lines-small'})
    loading.present();
    let date = new Date();
    var contact = { Name: form_value.Name, Mobile: form_value.Mobile, date: date,  readed: this.active, message: form_value.message}
    let dateNumber = Math.floor(Date.now() / 864000);
    
    const limit = await Storage.get({ key:'contactLimit'})
    const stored_limit = parseInt(limit.value)
    if (limit == null || dateNumber > stored_limit) {
      this.db.contaUs(contact)
      setTimeout(async () => {
        const toast = await this.toastController.create({
          message: '<p style="text-align: center">شكرا لتواصلك معنا سوف نتواصل معك في أقرب وقت</p>',
          duration: 4000
        });
        toast.present();
        this.contactForm.reset();
        loading.dismiss();
        this.router.navigateByUrl('/sections');
    }, 1000);
      Storage.set({key: 'contactLimit',value: (dateNumber + 1).toString()})
    }
    else{
      let newVal = stored_limit + 1
      Storage.set({key: 'contactLimit',value: (newVal).toString()})
      if (stored_limit < dateNumber + this.max) {
        this.db.contaUs(contact)
        setTimeout(async () => {
          const toast = await this.toastController.create({
            message: '<p style="text-align: center">شكرا لتواصلك معنا سوف نتواصل معك في أقرب وقت</p>',
            duration: 4000
          });
          toast.present();
          this.contactForm.reset();
          loading.dismiss();
          this.router.navigateByUrl('/sections');
      }, 1000);
      } else {
        setTimeout(async () => {
          const toast = await this.toastController.create({
            message: ' تجاوزت عدد مرات المراسلات  في اليوم',
            duration: 4000
          });
          toast.present();
          this.contactForm.reset();
          loading.dismiss();
          this.router.navigateByUrl('/sections');
      }, 1000);
      }
    }


    
  }
}
