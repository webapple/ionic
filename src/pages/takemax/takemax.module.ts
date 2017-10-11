import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakemaxPage } from './takemax';
import { TakecommentPageModule } from '../takecomment/takecomment.module';
import { TakelikePageModule } from '../takelike/takelike.module';

@NgModule({
  declarations: [
    TakemaxPage,
  ],
  imports: [
    IonicPageModule.forChild(TakemaxPage),
    TakecommentPageModule,
    TakelikePageModule
  ],
  exports:[
    TakemaxPage
  ]
})
export class TakemaxPageModule {}
