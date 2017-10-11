import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesRecommdendPage } from './pages-recommdend';

@NgModule({
  declarations: [
    PagesRecommdendPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesRecommdendPage),
  ],
  exports:[
    PagesRecommdendPage
  ]
})
export class PagesRecommdendPageModule {}
