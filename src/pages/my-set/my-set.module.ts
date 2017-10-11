import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySetPage } from './my-set';

@NgModule({
  declarations: [
    MySetPage,
  ],
  imports: [
    IonicPageModule.forChild(MySetPage),
  ],
  exports:[
    MySetPage
  ]
})
export class MySetPageModule {}
