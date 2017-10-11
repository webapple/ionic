import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleIssueTwoPage } from './article-issue-two';

@NgModule({
  declarations: [
    ArticleIssueTwoPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleIssueTwoPage),
  ],
  exports:[
    ArticleIssueTwoPage
  ]
})
export class ArticleIssueTwoPageModule {}
