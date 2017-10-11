import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleDetailsPage } from './article-details';

@NgModule({
  declarations: [
    ArticleDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleDetailsPage),
  ],
  exports:[
    ArticleDetailsPage
  ]
})
export class ArticleDetailsPageModule {}
