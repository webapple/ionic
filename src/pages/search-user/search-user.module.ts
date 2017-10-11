import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { SearchUsersPage } from './search-user';
import { FoundUserPageModule } from '../found/found-user/found-user.module';
import { PagesChoicenessPageModule } from '../pages-choiceness/pages-choiceness.module';

@NgModule({
  declarations: [
    SearchUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchUsersPage),
    FoundUserPageModule,
    PagesChoicenessPageModule
  ],
  exports:[
    SearchUsersPage
  ]
})
export class SearchUsersPageModule {}
