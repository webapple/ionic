import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakelikePage } from './takelike';

@NgModule({
  declarations: [
    TakelikePage,
  ],
  imports: [
    IonicPageModule.forChild(TakelikePage),
  ],
  exports:[
    TakelikePage
  ]
})
export class TakelikePageModule {}
