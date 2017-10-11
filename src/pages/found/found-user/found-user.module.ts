import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoundUserPage } from './found-user';
import { AppGlobal } from "../../../services/user.service";
@NgModule({
  declarations: [
    FoundUserPage,
  ],
  imports: [
    IonicPageModule.forChild(FoundUserPage),
  ],
  exports:[
    FoundUserPage
  ]
})
export class FoundUserPageModule {}
