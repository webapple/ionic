import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { App } from "ionic-angular/components/app/app";
import { UserService, AppGlobal, AppOnChangeSunject } from "../../services/user.service";
/**
 * Generated class for the StarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stars',
  templateUrl: 'stars.html',
})
export class StarsPage {
  @Input() data;
  @Input() isSubject;
  @Input() isZhuangfa: boolean = false;
  @Input() commentNum: boolean = false;
  userId: String;
  userToken;
  constructor(public userService: UserService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public storage: Storage, public app:App,
              public actionSheetCtrl: ActionSheetController,) {

    this.storageGet()
  }

  // @Input('isSubject') isSubject: boolean;

  ionViewDidLoad() {

    console.log('ionViewDidLoad StarsPage');
  }

  storageGet() {

    this.storage.get('user').then((val) => {
      if (val) { //  && val._id
        this.userId = val.data.userId
        this.userToken = val.data.token
      } else {
        this.userId = undefined
        this.userToken = undefined
      }
    });
  }



  onChangelike(data) {

    var params;
    if(data.isLike === 1) {
      params = {
        userId: this.userId,
        type: 1,
        action: 0
      }

    } else {
      params = {
        userId: this.userId,
        type: 1,
        action: 1
      }
    }

    this.userService.httpPut(this.userToken, AppGlobal.API.getArticleLcr + data.articleId, params, rs => {
      console.log(rs)
      if ( rs.code == 200 ) {
        if ( rs.data == "取消成功" ) {

          data.likeNum  -= 1;
          data.isLike = 0

        } else {
          data.likeNum  = rs.data.likeNum
          data.isLike = 1
        }

        // else {
        //   if(rs.data.likeNum == undefined) {
        //     data.likeNum = 0
        //   } else {
        //     data.likeNum  = rs.data.likeNum
        //   }
        //   // rs.data.likeNum || 0;
        //   data.likeNum  -= 1;
        //   data.isLike = 1
        //
        // }
        if(this.isSubject === true) {
          console.log('StarsOnChange')
          AppOnChangeSunject.StarsOnChange.next(200);
        }

      } else if ( rs.code == 400 ) {
        console.log(400)
      }

    })

  }

  onChangeCollect(data) {
    console.log('stars', data)
    var params;
    if(data.isCollect === 1) {
      params = {
        userId: this.userId,
        type: 2,
        action: 0
      }

    } else {
      params = {
        userId: this.userId,
        type: 2,
        action: 1
      }
    }
    console.log('stars params', params)
    this.userService.httpPut(this.userToken, AppGlobal.API.getArticleLcr + data.articleId, params, rs => {
      console.log('stars Data', rs)
      if ( rs.code == 200 ) {
        if ( rs.data == "取消成功" ) {
          data.collectNum -=1;
          // data.collectNum  = rs.data.collectNum
          data.isCollect = 0

        } else {
          data.collectNum  = rs.data.collectNum
          data.isCollect = 1
        }

        if(this.isSubject === true) {
          AppOnChangeSunject.StarsOnChange.next(200);
        }

      } else if ( rs.code == 400 ) {
        console.log(400)
      }


    })

  }

  goDetails(item) {
    this.app.getRootNav().push('ArticleDetailPage', {
      data: item
    })
  }

  share(event) {
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'shareButtons',
      buttons: [
        {
          text: 'QQ好友',
          cssClass: 'shareButton',
          icon: 'home',
          handler: () => {
            console.log(0)
          }
        },
        {
          text: 'QQ空间',
          cssClass: 'shareButton',
          icon: 'home',
          handler: () => {
            console.log(1)
          }
        },
        {
          text: '微信好友',
          cssClass: 'shareButton',
          icon: 'home',
          handler: () => {
            console.log(2)
          }
        },
        {
          text: '朋友圈',
          cssClass: 'shareButton',
          icon: 'home',
          handler: () => {
            console.log(3)
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

}
