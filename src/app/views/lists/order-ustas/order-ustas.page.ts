import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-order-ustas',
  templateUrl: './order-ustas.page.html',
  styleUrls: ['./order-ustas.page.scss'],
})
export class OrderUstasPage implements OnInit {
  order_affect
  constructor(private popoverCtr: PopoverController) { }

  ngOnInit() {
  }
  getorder(){
    this.popoverCtr.dismiss({order_affect:this.order_affect});
  }
}
