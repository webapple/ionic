import { Component } from '@angular/core';

import { App } from "ionic-angular/components/app/app";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService, AppGlobal, AppOnChangeSunject } from "../../services/user.service";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-found',
  templateUrl: 'found.html',
})
export class FoundPage {
  // data: any = [];
  items: any = [];
  params: any = {
    userId: ''
  }
  userId: String;
  userToken;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app:App,
              public storage: Storage,
              public userService: UserService) {
    this.getFoundUser()

    AppOnChangeSunject.FollowListOnChange.subscribe(res => {
      if (res == 200) {
        this.getFoundUser();//重新获取最新的数据
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FoundPage');
  }
  aa() {
    alert(this.userService.userId)

  }
  // storageGet() {
  //
  //   this.storage.get('user').then((val) => {
  //     if (val) { //  && val._id
  //       this.userId = val.data.userId
  //       this.userToken = val.data.token
  //     } else {
  //       this.userId = undefined
  //       this.userToken = undefined
  //     }
  //     alert(this.userId )
  //   });
  // }

  goSearchPage(event) {
    this.app.getRootNav().push('SearchUsersPage', {
      type: 1
    })
  };

  getFoundUser() {

    this.storage.get('user').then((val) => {
      if (val) { //  && val._id
        this.userId = val.data.userId
        this.userToken = val.data.token
      } else {
        this.userId = undefined
        this.userToken = undefined
      }

      this.params.userId = this.userId,
      this.userService.httpGet(this.userToken, AppGlobal.API.getDiscover, this.params, rs => {
        this.items = rs.data;
        console.log(rs)
      })

    });


  }

  // doInfinite(infiniteScroll) {
  //
  //   this.userService.httpGet(AppGlobal.API.getDiscover, this.params, rs => {
  //     // this.items = rs.data
  //
  //     if (rs.data.list.length > 0) {
  //       this.items = this.items.concat(rs.data.list);
  //     } else {
  //       infiniteScroll.enable(false);
  //       console.log("没有数据啦！")
  //     }
  //   })
  //
  //   setTimeout(() => {
  //     infiniteScroll.complete();
  //   }, 1500);
  // }

}
