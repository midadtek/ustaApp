import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { FstoreService} from '../../../services/fstore.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Storage } from '@ionic/storage';
import { ProfileBannerPage } from '../profile-banner/profile-banner.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ProfilePage } from '../profile/profile.page';
import { ElementRef, NgZone, ViewChild} from '@angular/core';
import { Usta, Rate } from 'src/app/services/interfaces';
import { RateComponent } from 'src/app/components/Rate/rate.component';

@Component({
  selector: 'app-housecarstuffprofile',
  templateUrl: './house-car-stuff-profile.page.html',
  styleUrls: ['./house-car-stuff-profile.page.scss'],
})
export class housescarstuffprofilePage implements OnInit {
  ustaid
  ratelist: Rate[]
  usta: Usta
  ustafavorite: boolean;
  typeplat: boolean
  favorites
  currentTime
  max:number=50
  canRate: boolean
  usta_segment: string
  locationCoords: any;
  timetest: any;

  language = { en: ".الانكليزية", tr: ".التركية", ar: ".العربية" }
  nationality = { SY: "سوريا", TR: "تركيا", PA: "فلسطين", EG: "مصر", IR: "العراق", LB: "لبنان", MO: "المغرب", AL: "الجزائر", LI: "ليبيا", TU: "تونس", SU: "السودان", YE: "اليمن", OM: "عمان", BA: "البحرين", KU: "الكويت", JO: "الاردن" }
 
 
  slideOpts={
    zoom:false,
    slidesPerView:1.5,
    centeredSlides:true,
    spaceBetween:20
  };
 
  constructor(private db: FstoreService, private route: ActivatedRoute,
    private loadingController: LoadingController, public navCtrl: NavController, public platform: Platform,
    private callNumber: CallNumber, private storage: Storage, private rateModel: ModalController
    , private popoverCtr: PopoverController, private clipboard: Clipboard,
     public toastController: ToastController, private modalCtr: ModalController,
      private socialSharing: SocialSharing){
      this.usta_segment = "details";

      this.timetest = Date.now();
    }




   async  ngOnInit() {
    this.ustaid = this.route.snapshot.params['id'];
    if (this.ustaid) {
      this.loadUstaProfile();
      this.storage.get('favorite').then((val) => {
        if (val != null) {
          this.favorites = val
          this.ustafavorite = (val.indexOf(this.ustaid) > -1) ? true : false;
        }
        else {
          this.favorites = []
          this.ustafavorite = false;
        }
      })
    }
    this.storage.get('CanRate').then(val => {
      if (val == null) {
        this.canRate = true
        this.storage.set('CanRate', [])
      } else {
        if (val.indexOf(this.ustaid) !== -1) {
          this.canRate = false
        } else {
          this.canRate = true
        }
      }
    })
    await this.platform.ready();


  }
  async loadUstaProfile() {
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    this.db.getUstaProfile(this.ustaid).subscribe(res => {
      this.db.getUstaRate(this.ustaid).subscribe(res2 => {
        this.ratelist = res2;
        this.usta = res;
        loading.dismiss();
      });
    });


  }
  async ustarate() {

    const modal = await this.rateModel.create(
      {
        component: RateComponent,
        componentProps: {
          ustaid: this.ustaid,
          ustarate: this.usta.ustarate,
          ustaname: this.usta.name
        }
      });
    modal.present();
    modal.onWillDismiss().then(async result => {
      if (result.data.rateSubmit) {
        if (result.data.rateSubmit) {
          this.canRate = false
          const toast = await this.toastController.create({
            message: 'شكراً على التفاعل , رأيكم يهمنا',
            duration: 4000,
            showCloseButton: true,
            position: 'middle',
            animated: true,
          });
          toast.present();
        }
      }
    })
  }
  addTofavorite() {
    this.favorites.push(this.ustaid)
    this.storage.set('favorite', this.favorites);
    this.ustafavorite = true
  }
  removeFromfav() {
    this.favorites = this.favorites.filter(filter => {
      return filter != this.ustaid
    })
    this.storage.set('favorite', this.favorites);
    this.ustafavorite = false;
  }
  call(number) {
    let date = new Date();
    let dateNumber = Math.floor(Date.now() / 864000);
    this.storage.get('callLimit').then(async (val) => {
      if (val == null || dateNumber > val) {
        this.db.addCallingUsta(this.ustaid);
        this.callNumber.callNumber(number, true)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => console.log('Error launching dialer', err));
        this.storage.set('callLimit', dateNumber + 1)
      }
      else {
        if (val < dateNumber + this.max) {
          this.db.addCallingUsta(this.ustaid);
          this.callNumber.callNumber(number, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
          let newVal = val + 1
          this.storage.set('callLimit', newVal)
        } else {
          setTimeout(async () => {
            const toast = await this.toastController.create({
              message: ' تجاوزت عدد مرات التواصل  في اليوم',
              duration: 4000
            });
            toast.present();
          }, 1000);
        }
      }
    })
  }
  copyNumber(number) {

    let date = new Date();
    let dateNumber = Math.floor(Date.now() / 864000);
    this.storage.get('callLimit').then(async (val) => {
      if (val == null || dateNumber > val) {
        this.db.addCallingUsta(this.ustaid);
        this.clipboard.copy(number).then(async () => {
          const toast = await this.toastController.create({
            message: 'تم نسخ الرقم',
            duration: 2000
          });
          toast.present();
        }).catch(err => console.log('Error launching dialer', err))
        this.storage.set('callLimit', dateNumber + 1)
      }
      else {
        if (val < dateNumber + this.max) {
          this.db.addCallingUsta(this.ustaid);
          this.clipboard.copy(number).then(async () => {
            const toast = await this.toastController.create({
              message: 'تم نسخ الرقم',
              duration: 2000
            });
            toast.present();
          }).catch(err => console.log('Error launching dialer', err))
          let newVal = val + 1
          this.storage.set('callLimit', newVal)
        } else {
          setTimeout(async () => {
            const toast = await this.toastController.create({
              message: ' تجاوزت عدد مرات التواصل  في اليوم',
              duration: 4000
            });
            toast.present();
          }, 1000);
        }
      }
    })

  }
  copySocial(social) {
    this.clipboard.copy(social).then(async () => {
      const toast = await this.toastController.create({
        message: 'تم النسخ',
        duration: 2000
      });
      toast.present();
    }).catch(err => console.log('Error launching dialer', err))
  }
  copyEmail(email) {
    this.clipboard.copy(email).then(async () => {
      const toast = await this.toastController.create({
        message: 'تم النسخ',
        duration: 2000
      });
      toast.present();
    }).catch(err => console.log('Error launching dialer', err))
  }
  async openBanner(item) {
    const modal = await this.modalCtr.create({
      component: ProfileBannerPage,
      cssClass: 'modal-fullscreen',
      componentProps: {
        banner: this.usta.img_gallery,
        i: item
      }
    });
    modal.present();
  }
  async openProfile() {
    const popover = await this.popoverCtr.create(
      {
        component: ProfilePage,
        componentProps: {
          profile: this.usta.img_profile
        }
      });
    popover.present();
  }
  async shareWhatsApp() {
    this.socialSharing.shareViaWhatsApp("http://usta-job.com/ustaprofile/" + this.ustaid).then(() => {
    }).catch((e) => {
    });
  }
}