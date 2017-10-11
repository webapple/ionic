import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BigVPage } from './big-v';

@NgModule({
  declarations: [
    BigVPage,
  ],
  imports: [
    IonicPageModule.forChild(BigVPage),
  ],
  exports:[
    BigVPage
  ]
})
export class BigVPageModule {}
