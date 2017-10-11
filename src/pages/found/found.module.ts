import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoundPage } from './found';
import { FoundUserPageModule } from './found-user/found-user.module';

@NgModule({
  declarations: [
    FoundPage,
  ],
  imports: [
    IonicPageModule.forChild(FoundPage),
    FoundUserPageModule
  ],
  exports:[
    FoundPage
  ]
})
export class FoundPageModule {}
