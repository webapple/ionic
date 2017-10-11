import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService, AppGlobal } from "../../services/user.service";
/**
 * Generated class for the ArticleReadpayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-readpay',
  templateUrl: 'article-readpay.html',
})
export class ArticleReadpayPage {
  imgurl = AppGlobal.imgurl;
  item: any = [];

  @ViewChild('zfb')
  zfb: ElementRef;

  @ViewChild('wx')
  wx: ElementRef;

  constructor(public userService: UserService,
              public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleReadpayPage');
  }

  goToPay() {
    console.log("支付宝",this.zfb.nativeElement.checked)
    console.log("腾旭",this.wx.nativeElement.checked)
    if(this.zfb.nativeElement.checked) {

    } else if (this.wx.nativeElement.checked){

    }
  }

}
