import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditorPage } from './editor';
import { EditorModule } from 'primeng/primeng';


@NgModule({
  declarations: [
    EditorPage,
  ],
  imports: [
    IonicPageModule.forChild(EditorPage),
    EditorModule
  ],
  exports:[EditorPage]
})
export class EditorPageModule {


}
