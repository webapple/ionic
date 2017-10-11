import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PagesRecommdendPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-recommdend',
  templateUrl: 'pages-recommdend.html',
})
export class PagesRecommdendPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesRecommdendPage');
  }
  slides: any = [
    {
      image:"assets/img/001.jpg",
      text:"大理的洱海"
    },
    {
      image:"assets/img/002.jpg",
      text:"至少还有首歌来给我安慰"
    },
  ];
  cards:any=[
    {
      avatar:"assets/img/001.jpg",
      image:"assets/img/002.jpg",
      name:"迷途的小沙发",
      title:"旅行攻略",
      main:"去哪旅行,MD,一张票都买不到,最强国庆买票攻略等你来挑战.去哪旅行,MD,一张票都买不到,最强国庆买票攻略等你来挑战",
      price:"免费",
      ngclass: false,
      time:"9月1号"
    },
    {
      avatar:"assets/img/001.jpg",
      image:"assets/img/002.jpg",
      name:"迷途的小沙发",
      title:"旅行攻略",
      main:"去哪旅行,MD,一张票都买不到,最强国庆买票攻略等你来挑战.去哪旅行,MD,一张票都买不到,最强国庆买票攻略等你来挑战",
      price:"￥5",
      ngclass:true,
      time:"9月15号"
    },
  ]
}
