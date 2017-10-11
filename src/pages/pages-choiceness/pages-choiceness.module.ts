import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesChoicenessPage } from './pages-choiceness';
import {StarsPageModule} from "../../components/stars/stars.module";

@NgModule({
  declarations: [
    PagesChoicenessPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesChoicenessPage),
    StarsPageModule
  ],
  exports:[
    PagesChoicenessPage
  ]
})
export class PagesChoicenessPageModule {}
