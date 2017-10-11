import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleDetailPage } from './article-detail';
import {StarsPageModule} from "../../components/stars/stars.module";

@NgModule({
  declarations: [
    ArticleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleDetailPage),
    StarsPageModule
  ],
  exports:[
    ArticleDetailPage
  ]
})
export class ArticleDetailPageModule {}
