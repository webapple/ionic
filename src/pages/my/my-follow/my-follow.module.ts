import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFollowPage } from './my-follow';
import { FoundUserPage } from '../../found/found-user/found-user';
import { FoundUserPageModule } from '../../found/found-user/found-user.module';

@NgModule({
  declarations: [
    MyFollowPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFollowPage),
    FoundUserPageModule
  ],
  exports:[
    MyFollowPage
  ]
})
export class MyFollowPageModule {}
