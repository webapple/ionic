import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService, AppGlobal, AppOnChangeSunject } from "../../../services/user.service"
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MyFollowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-follow',
  templateUrl: 'my-follow.html',
})
export class MyFollowPage {
  items: any = [];
  followNum;
  userId: String;
  userToken;
  constructor(public userService: UserService,
              public storage: Storage,
              public navCtrl: NavController, public navParams: NavParams) {
    this.getFoundUser()
    AppOnChangeSunject.FollowListOnChange.subscribe(res => {
      if (res == 200) {
        var params = {
          userId: this.userId,
        }
        this.userService.httpGet(this.userToken, AppGlobal.API.getMyUser, params, rs => {
          console.log('dsffffffffffffffffff', rs)
          this.followNum = rs.data.size
        })
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFollowPage');
  }

  getFoundUser() {

    this.storage.get('user').then((val) => {
      if (val) { //  && val._id
        this.userId = val.data.userId
        this.userToken = val.data.token
      } else {
        this.userId = undefined
        this.userToken = undefined
      }

      var params = {
        userId: this.userId,
        pageNo: 1,
        pageSize: 10
      }

      this.userService.httpGet(this.userToken, AppGlobal.API.getMyUser, params, rs => {
        console.log(rs)
        this.followNum = rs.data.size
        this.items = rs.data.list

      })
    });


  }

}
