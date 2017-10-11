import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActicleListPage } from './acticle-list';
import {StarsPageModule} from "../../components/stars/stars.module";

@NgModule({
  declarations: [
    ActicleListPage,
  ],
  imports: [
    IonicPageModule.forChild(ActicleListPage),
    StarsPageModule
  ],
  exports:[ActicleListPage]
})
export class ActicleListPageModule {}
