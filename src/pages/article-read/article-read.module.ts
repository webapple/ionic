import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleReadPage } from './article-read';

@NgModule({
  declarations: [
    ArticleReadPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleReadPage),
  ],
  exports:[
    ArticleReadPage
  ]
})
export class ArticleReadPageModule {}
