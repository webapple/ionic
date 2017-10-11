import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SwiperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-swiper',
  templateUrl: 'swiper.html',
})
export class SwiperPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwiperPage');
  }

  slides: any = [
    {
      image:"assets/img/001.jpg",
      text:"如果爱情就在洱海边",

    },
    {
      image:"assets/img/002.jpg",
      text:"至少有十年不曾流泪",

    },
  ];
}
