import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleIssueOnePage } from './article-issue-one';
import {EditorModule} from "primeng/primeng";

@NgModule({
  declarations: [
    ArticleIssueOnePage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleIssueOnePage),
    EditorModule,
  ],
  exports:[
    ArticleIssueOnePage
  ]
})
export class ArticleIssueOnePageModule {}
