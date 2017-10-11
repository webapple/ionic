import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadVideoPricePage } from './upload-video-price';

@NgModule({
  declarations: [
    UploadVideoPricePage,
  ],
  imports: [
    IonicPageModule.forChild(UploadVideoPricePage),
  ],
  exports:[
    UploadVideoPricePage
  ]
})
export class UploadVideoPricePageModule {}
