import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserService, AppGlobal, AppOnChangeSunject } from "../../services/user.service";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ArticleCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-comment',
  templateUrl: 'article-comment.html',
})
export class ArticleCommentPage {
  articleId;
  commentText;
  userId: String;
  userToken;
  constructor(public userService: UserService,
              public storage: Storage,
              public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.articleId = this.navParams.get('data')
    this.userId = this.userService.userId
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleCommentPage');
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  storageGet() {


  }

  addComent() {

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
        articleId: this.articleId,
        content: this.commentText,
      }
      console.log('addComent', params)
      this.userService.httpPost(this.userToken, AppGlobal.API.addComment, params, rs => {

        if(rs.code == 200) {
          AppOnChangeSunject.CommentListOnChange.next(200);
          this.dismiss()
        }

      })


    });




  }

}
