import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyActiclePage } from './my-acticle';
import { PagesChoicenessPageModule } from '../../pages-choiceness/pages-choiceness.module';

@NgModule({
  declarations: [
    MyActiclePage,
  ],
  imports: [
    IonicPageModule.forChild(MyActiclePage),
    PagesChoicenessPageModule
  ],
  exports:[
    MyActiclePage
  ]
})
export class MyActiclePageModule {}
