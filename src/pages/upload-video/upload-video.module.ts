import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadVideoPage } from './upload-video';

@NgModule({
  declarations: [
    UploadVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadVideoPage),
  ],
  exports:[
    UploadVideoPage
  ]
})
export class UploadVideoPageModule {}
