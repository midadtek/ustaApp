import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { UstaprofilePage } from '../app/views/profiles/ustaprofile/ustaprofile.page';
import { FCM } from '@ionic-native/fcm/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  counter = 0;
  timerId
  app_version
  navi: boolean = true;
  public appPages = [
    {
      title: 'الخدمات',
      url: '/dashboard',
      icon: 'filing'
    },{
      title: 'المفضلة',
      url: '/favorites',
      icon: 'heart'
    },
    {
      title: 'الاسئلة الشائعة',
      url: '/asked-question',
      icon: 'help-buoy'
    },
    {
      title: 'من نحن',
      url: '/about-us',
      icon: 'information-circle-outline'
    }
  ];
  

  constructor(
    private appVersion: AppVersion,
    private platform: Platform,  private fcm: FCM,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,private network: Network,private alertController: AlertController,
    private storage: Storage, private router: Router, private deeplink: Deeplinks
  ) {
    this.initializeApp();
  }


  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'خطأ',
      subHeader: 'لا يوجد اتصال',
      message: 'الرجاء تأمين اتصال بالانترنت',
      buttons: [
         {
          text: 'اغلاق',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });  

    await alert.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {

      this.fcm.getToken().then(token => {
        console.log(token);
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });

      // this.fcm.onNotification().subscribe(data => {
      //   console.log(data);
      //   if (data.wasTapped) {
      //     console.log('Received in background');
      //     this.router.navigate([data.landing_page, data.price]);
      //   } else {
      //     console.log('Received in foreground');
      //     this.router.navigate([data.landing_page, data.price]);
      //   }
      // });

 
  

      this.splashScreen.hide();
      this.statusBar.styleDefault();
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.presentAlert()
        
      });      
      this.appVersion.getVersionNumber().then(
        (versionNumber) => {
          this.app_version = versionNumber;
        },
        (error) => {
          console.log(error);
        });
      
      this.platform.backButton.subscribe(async () => {
        if (this.counter == 0) {
          this.counter++;
          this.timerId = setTimeout(() => { this.counter = 0 }, 1000)
        } else {
          clearTimeout(this.timerId);
          navigator['app'].exitApp();
        }
      })
      this.deeplink.route({
        '/ustaprofile/:id': UstaprofilePage
      })
        .subscribe((match) => {
          this.navi = false
          this.router.navigate(['/ustaprofile', match.$args.id]);
        }, (nomatch) => {
          this.navi = false
          this.router.navigateByUrl('/dashboard');
        })
        this.router.navigateByUrl('/dashboard');
      // this.storage.get('first_time').then((val) => {
      //   if (val !== null) {
      //     if (this.navi) {
      //       this.router.navigateByUrl('/sections');
      //     } else {
      //       this.navi = true
      //     }
      //   } else {
      //     if (this.navi) {
      //       this.router.navigate(['/intro']);
      //       this.storage.set('first_time', 'done');
      //     } else {
      //       this.navi = true
      //     }
      //   }
      // });
    });
  }
}
