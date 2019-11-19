import { Component, OnInit } from '@angular/core';
import {  FstoreService } from 'src/app/services/fstore.service';
import { LoadingController } from '@ionic/angular';
import { Question } from 'src/app/services/interfaces';
@Component({
  selector: 'app-asked-question',
  templateUrl: './asked-question.page.html',
  styleUrls: ['./asked-question.page.scss'],
})
export class AskedQuestionPage implements OnInit {

  constructor(private db:FstoreService,private loadingController:LoadingController) { }
  question:Question[]
  public isMenuOpen : boolean = false;
  ngOnInit() {
    this.loadQuestion()
  }
  async loadQuestion() {
    const loading = await this.loadingController.create({
      spinner: 'lines-small'
    });
    await loading.present();
    this.db.getAskedQuestion().subscribe(res=>{
      this.question=res
      loading.dismiss();
    })
    
  }
  public toggleAccordion(item): void {
    item.active = !item.active;
    item.isMenuOpen=!item.isMenuOpen
 }
}
