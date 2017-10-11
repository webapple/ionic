import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakecommentPage } from './takecomment';

@NgModule({
  declarations: [
    TakecommentPage,
  ],
  imports: [
    IonicPageModule.forChild(TakecommentPage),
  ],
  exports:[
    TakecommentPage
  ]
})
export class TakecommentPageModule {}
