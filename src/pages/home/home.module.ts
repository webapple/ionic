import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SwiperPageModule } from './swiper/swiper.module';
import { PagesChoicenessPageModule } from '../pages-choiceness/pages-choiceness.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SwiperPageModule,
    PagesChoicenessPageModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
