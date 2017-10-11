import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleIssueFourPage } from './article-issue-four';

@NgModule({
  declarations: [
    ArticleIssueFourPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleIssueFourPage),
  ],
  exports:[
    ArticleIssueFourPage
  ]
})
export class ArticleIssueFourPageModule {}
