import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { App } from "ionic-angular/components/app/app";

import { UserService, AppGlobal, AppOnChangeSunject } from "../../services/user.service";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ArticleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {
  item: any = []
  imgurl = AppGlobal.imgurl;
  comments: any = []
  hasmore: boolean = true;

  parmas: any = {
    articleId: '',
    userId: '',
    pageNo: 1,
    pageSize: 5,
  }

  userId: String;
  userToken;
  constructor(public userService: UserService,
              public storage: Storage,
              public navCtrl: NavController, public navParams: NavParams, public app:App, public modalCtrl: ModalController) {
    this.item = this.navParams.get('data');

    this.getComments()
    AppOnChangeSunject.CommentListOnChange.subscribe(res => {
      if (res == 200) {
        this.getComments();//重新获取最新的数据
      }
    })

  }

  getComments() {

    this.storage.get('user').then((val) => {
      if (val) { //  && val._id
        this.userId = val.data.userId
        this.userToken = val.data.token
      } else {
        this.userId = undefined
        this.userToken = undefined
      }

      this.parmas.userId = this.userId;
      this.parmas.articleId = this.item.articleId
      this.parmas.pageNo = 1;
      this.parmas.pageSize = 20;
      this.userService.httpGet(this.userToken, AppGlobal.API.getComment, this.parmas, rs => {
        console.log('articleDetail Parmas', this.parmas)
        console.log('articleDetail Data', rs)
          this.comments = rs.data.list;
          this.parmas.pageNo += 1;
          // this.comments.concat(rs.data.list);
          // this.parmas.pageNo += 1;
      })

    });
  }



  ionViewDidLoad() {

    // this.getComments()
  }

  doInfinite(infiniteScroll) {

    if (this.hasmore == false) {
      return;
    }

    this.userService.httpGet(this.userToken, AppGlobal.API.getComment, this.parmas, rs => {

      // this.parmas.pageNo += 1;
      // if(this.parmas.pageNo >= rs.data.list.pages) {
      //   this.comments = this.comments.concat(rs.data.list);
      // }
      console.log('articleDetail Parmas doInfinite', this.parmas)
      console.log('articleDetail Data doInfinite', rs)

      if (rs.data.list.length > 0) {

        this.comments = this.comments.concat(rs.data.list);
        this.parmas.pageNo += 1;
      }
      else {
        this.hasmore = false;
        infiniteScroll.enable(false);
        console.log("没有数据啦！")
      }
    })

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1500);
  }

  onChangelike(data) {
    // let isLike =

    var params;
    if(data.isLike === 1) {
      params = {
        commentId: data.commentId,
        userId: this.userService.userId,
        action: 0
      }
    } else {
      params = {
        commentId: data.commentId,
        userId: this.userService.userId,
        action: 1
      }
    }

    this.userService.httpPut(this.userToken, AppGlobal.API.getCommentStar, params, rs => {

      if ( rs.code == 200 ) {
        if ( rs.data == "取消点赞成功" ) {
          if(rs.data.likeNum == undefined) {
            data.likeNum = 0
          } else {
            data.likeNum  = rs.data.likeNum
          }
          data.isLike = 0

        } else {
          if(rs.data.likeNum == undefined) {
            data.likeNum = 0
          } else {
            data.likeNum  = rs.data.likeNum
          }
          data.isLike = 1

        }

      } else if ( rs.code == 400 ) {
        console.log(400)
      }

    })

  }

  goRead(item) {
    console.log(item)
    this.app.getRootNav().push('ArticleReadPage', {
      data: item
    })
  }

  goPayRead(item) {
    this.app.getRootNav().push('ArticleReadpayPage', {
      data: item
    })
  }

  presentModal(){
    let myModal = this.modalCtrl.create('ArticleCommentPage', {
      data: this.item.articleId
    });
    myModal.present();
  }
}
