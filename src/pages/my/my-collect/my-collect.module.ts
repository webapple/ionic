import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCollectPage } from './my-collect';
import { PagesChoicenessPageModule } from '../../pages-choiceness/pages-choiceness.module';

@NgModule({
  declarations: [
    MyCollectPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCollectPage),
    PagesChoicenessPageModule
  ],
  exports:[
    MyCollectPage
  ]
})
export class MyCollectPageModule {}
