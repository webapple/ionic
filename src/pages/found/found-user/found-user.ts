import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService, AppGlobal, AppOnChangeSunject } from '../../../services/user.service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FoundUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-found-user',
  templateUrl: 'found-user.html',
})
export class FoundUserPage {
  imgurl = AppGlobal.imgurl;
  @Output() userNum = new EventEmitter();

  @Input('items') items: any = [];

  @Input('isSubject') isSubject: boolean;
  userId: String;
  userToken;
  constructor(public userService: UserService,
              public storage: Storage,
              public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoundUserPage');
  }

  changeFollow(data) {

    this.storage.get('user').then((val) => {
      if (val) { //  && val._id
        this.userId = val.data.userId
        this.userToken = val.data.token
      } else {
        this.userId = undefined
        this.userToken = undefined
      }


      var params;
      if(data.isFan == 1) {
        params = {
          authorId: data.userId,
          userId: this.userId,
          action: 0
        }
      } else {
        params = {
          authorId: data.userId,
          userId: this.userId,
          action: 1
        }
      }

      this.userService.httpPut(this.userToken, AppGlobal.API.getFollow, params, rs => {
        if ( rs.code == 200 ) {
          if ( rs.data == "关注成功" ) {
            data.isFan = 1
          } else {
            data.isFan = 0
          }

          if(this.isSubject === true) {
            console.log('FollowListOnChange')
            console.log(rs)
            AppOnChangeSunject.FollowListOnChange.next(200);
          }

        } else if ( rs.code == 400 ) {
        }
      })

    });



  }

}
