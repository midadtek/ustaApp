import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order_affect

  constructor(private popoverCtr: PopoverController) { }

  ngOnInit() {}

  getorder(){
    this.popoverCtr.dismiss({order_affect:this.order_affect});
  }
}
