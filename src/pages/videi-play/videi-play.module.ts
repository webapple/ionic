import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideiPlayPage } from './videi-play';

@NgModule({
  declarations: [
    VideiPlayPage,
  ],
  imports: [
    IonicPageModule.forChild(VideiPlayPage),
  ],
  exports:[
    VideiPlayPage
  ]
})
export class VideiPlayPageModule {}
