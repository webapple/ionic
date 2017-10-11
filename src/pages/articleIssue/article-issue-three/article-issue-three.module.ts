import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleIssueThreePage } from './article-issue-three';

@NgModule({
  declarations: [
    ArticleIssueThreePage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleIssueThreePage),
  ],
  exports:[
    ArticleIssueThreePage
  ]
})
export class ArticleIssueThreePageModule {}
