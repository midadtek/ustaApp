import { Component, OnInit } from '@angular/core';
import { FstoreService } from 'src/app/services/fstore.service';
import { Section } from 'src/app/services/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private fstore:FstoreService) { }
services:Section[];
totalServices:number;
serSupscription:Subscription
  ngOnInit() {

      this.serSupscription = this.fstore.getSections().subscribe(services=>{
        this.services = services.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as Section;
          
        })
        this.totalServices = this.services.reduce(function(prev, cur) {return prev + cur.ustacount;}, 0);
    })
    
  }

}
