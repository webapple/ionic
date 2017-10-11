import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupPurchasePage } from './group-purchase';

@NgModule({
  declarations: [
    GroupPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(GroupPurchasePage),
  ],
  exports:[GroupPurchasePage]
})
export class GroupPurchasePageModule {}
