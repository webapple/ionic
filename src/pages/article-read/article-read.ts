import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService, AppGlobal } from "../../services/user.service";
/**
 * Generated class for the ArticleReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-read',
  templateUrl: 'article-read.html',
})
export class ArticleReadPage {
  item: any = []
  imgurl = AppGlobal.imgurl;

  constructor(public userService: UserService,
              public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleReadPage');
  }

}
