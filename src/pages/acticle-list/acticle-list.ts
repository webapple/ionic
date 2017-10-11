import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from "ionic-angular/components/app/app";
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ArticleDetailPage } from "../article-detail/article-detail";
import { UserService } from "../../services/user.service";

/**
 * Generated class for the ActicleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acticle-list',
  templateUrl: 'acticle-list.html',
})
export class ActicleListPage {
  @Input() data: any = {};

  imgurl;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app:App, public storage: Storage,
              public userService: UserService,
              public http: Http, ) {

    this.imgurl = this.userService.imgurl;

    // this.storageGet()
    // AppOnChangeSunject.AddressListOnChange.subscribe(res => {
    //   if (res == 200) {
    //     this.getProducts();//重新获取最新的数据
    //   }
    // })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesChoicenessPage');
  }

  goDetails(item) {
    this.app.getRootNav().push(ArticleDetailPage, {
      data: item
    })
  }

}
