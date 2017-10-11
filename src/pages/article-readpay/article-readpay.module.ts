import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleReadpayPage } from './article-readpay';

@NgModule({
  declarations: [
    ArticleReadpayPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleReadpayPage),
  ],
  exports:[
    ArticleReadpayPage
  ]
})
export class ArticleReadpayPageModule {}
