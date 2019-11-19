import { Component, OnInit } from '@angular/core';
import {  FstoreService } from 'src/app/services/fstore.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Usta } from 'src/app/services/interfaces';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  ustas: Usta[]=[];
  constructor(private storage: Storage, private fireDataService:FstoreService ,
    private loadingController: LoadingController) { }
  ngOnInit() {
    this.loadUstas()
  }
  async loadUstas() {
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    this.storage.get('favorite').then((val) => {
      if (val != null) {
        val.forEach(favorate => {
          this.fireDataService.getUstaWithId(favorate).subscribe(res => { 
            res.id = favorate;
            this.ustas.push(res);
          });
        });
      }
      loading.dismiss();
    }) ;
  }
}
