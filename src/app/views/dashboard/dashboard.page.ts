import { Component, OnInit} from '@angular/core';
import { FstoreService } from 'src/app/services/fstore.service';
import { Section, Banner, Usta } from 'src/app/services/interfaces';
import { Subscription } from 'rxjs';
import { AlertController, ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { resultsPage } from '../results/results.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  searchTerm: string = '';
  scrolling = false;
  services: Section[] = [];
  business: Section[] = [];
  usedShops: Section[] = [];
  totalServices: number;
  totalBusiness: number;
  totalUsedShops: number;
  serSupscription: Subscription;
  banners: Banner[];
  slideOpts = {
    zoom: false,
    centeredSlides: true,
    roundLengths: true,
    effect: 'flip',
    pagination: false,
    loop: true,
    speed: 1000,
    autoplay: true
    

  };
  private businessIds = ['4TRI4w7NCIcuMtxySXix', 'QgfSghbyU5QdJFvDFMuo', 'lQhp1nvbxO56DWe2BF4c'];
  private usedShopsIds = ['XF0nvOlqe0kiGR3badlt', 'X8YhOaNVHSBsje3DjM3w', 'yCncXQlblutGpU8YlbjW'];

allustas
show
name
mobile
hash_id

  constructor(private fstore: FstoreService, private alertCtr: AlertController, private modalCtr: ModalController,
              private actionSheetController: ActionSheetController, private router: Router,public navCtrl: NavController,
              private callNumber: CallNumber) { }

  ngOnInit() {

    this.fstore.checkin();
    this.fstore.getBanners().subscribe(banners => {this.banners = banners.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      } as Banner; }); });
    this.serSupscription = this.fstore.getSections().subscribe(services => {
      const totalSection = services.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as Section;

      });
      this.services = totalSection.filter(section => !this.businessIds.includes(section.id) && !this.usedShopsIds.includes(section.id));
      this.business = totalSection.filter(section => this.businessIds.includes(section.id));
      this.usedShops = totalSection.filter(section => this.usedShopsIds.includes(section.id));
      this.totalServices = this.services.reduce((prev, cur) => prev + cur.ustacount, 0);
      this.totalBusiness = this.business.reduce((prev, cur) => prev + cur.ustacount, 0);
    });

    this.fstore.getustas().subscribe(r=>{
      this.allustas=r;
      // console.log(this.allustas)
    })

  }
  scrollStart() {
    this.scrolling = true;
  }
  scrollEnd() {
    this.scrolling = false;
  }
  ionViewWillLeave() {
    this.serSupscription.unsubscribe();
  }

  callUs() {
    this.actionSheetController.create({
      cssClass: '',
      header: 'تواصل معنا',
      buttons: [{
        text: 'اتصال',
        role: 'destructive',
        icon: 'call',
        handler: () => {
          this.callNumber.callNumber('00905524862486', true)
          .then(res => this.actionSheetController.dismiss())
          .catch(err => console.log('Error launching dialer', err));
        }
      }, {
        text: 'واتس اب',
        icon: 'logo-whatsapp',
        handler: () => {
          window.open(`https://api.whatsapp.com/send?phone=+905524862486`);
        }

      }]
    }).then(asCtrEl => asCtrEl.present());
  }


    async result(){



      
          
          if (this.searchTerm.length >=4) {
      
            this.allustas = this.allustas.filter(usta => 
              { try{return ((usta.name.indexOf(this.searchTerm) > -1) ||
                 (usta.mobile.indexOf(this.searchTerm) > -1) ||
                  (usta.hash_id.indexOf(this.searchTerm) > -1))}
                  catch(err){
                  }; 
              }
    
              )
          
          
        }
        let res = this.allustas
        
                     
        const modal=await this.modalCtr.create({
        component:resultsPage,
        componentProps:{
        usta:res,
      }
    
    });
    modal.present();
          
          
          }
         
            
            
            
    
    
    }
 
    
    
    
  


