import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { FstoreService } from 'src/app/services/fstore.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent implements OnInit {

  rate: number
  ustaid: string
  ustaoldrate: number
  ustaname: string
  rateForm: FormGroup;
  active: boolean
  constructor(
    private formBuilder: FormBuilder,
    private navParams: NavParams
    , private db: FstoreService,
    private modelCtr: ModalController,
    public toastController: ToastController,
    private storage: Storage
  ) { }
  ngOnInit() {
    this.ustaid = this.navParams.get('ustaid')
    this.ustaoldrate = this.navParams.get('ustarate')
    this.ustaname = this.navParams.get('ustaname')
    this.rateForm = this.formBuilder.group({
      'username': [null, Validators.compose([
        Validators.required
      ])],
      'opinion': [null, Validators.compose([
      ])]
    });
  }
  async submitForm(value: any) {
    this.storage.get('CanRate').then(val => {
      if (val.indexOf(this.ustaid) !== -1) {
      } else {
        let date = new Date();
        let ustarate = { client: value.username, rate_value: this.rate, message: value.opinion, ustaId: this.ustaid, created_at: date, active: false, usta_name: this.ustaname }
        this.db.addRate(ustarate)
        // this.db.updateUstaRate(this.rate, this.ustaid)
        let newRate = val
        newRate.push(this.ustaid)
        this.storage.set('CanRate', newRate)
      }
    })
    this.modelCtr.dismiss({ rateSubmit: true });
  }
  close() {
    this.modelCtr.dismiss({ rateSubmit: false });
  }

}
