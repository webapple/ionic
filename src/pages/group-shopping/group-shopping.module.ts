import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupShoppingPage } from './group-shopping';

@NgModule({
  declarations: [
    GroupShoppingPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupShoppingPage),
  ],
  exports:[
    GroupShoppingPage
  ]
})
export class GroupShoppingPageModule {}
