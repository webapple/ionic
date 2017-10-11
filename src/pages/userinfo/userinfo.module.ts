import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserinfoPage } from './userinfo';

@NgModule({
  declarations: [
    UserinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserinfoPage),
  ],
  exports:[
    UserinfoPage
  ]
})
export class UserinfoPageModule {}
