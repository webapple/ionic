import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {stringify} from "@angular/core/src/util";
import {App} from "ionic-angular/components/app/app";
import {ArticleIssueFourPage} from "../../article-issue-four/article-issue-four";
import {TabsPage}from "../../tabs/tabs";
import { Storage } from '@ionic/storage';
import { ArticleService } from "../../../services/article";
/**
 * Generated class for the ArticleIssueThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-issue-three',
  templateUrl: 'article-issue-three.html',
})
export class ArticleIssueThreePage {
  relationship:string = "1";
  nextTo:string = "发布";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app:App,
    private artcleService: ArticleService,
    private storage: Storage,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleIssueThreePage');
  }
  publish(){
    if(this.relationship == "1"){
      this.nextTo = "发布";
      // this.app.getRootNav().push(ArticleIssueFourPage);
    }else{
      this.nextTo = "下一步";
    }
  }
  next(){
    let $this :any = this;
    if(this.relationship == "1"){
      $this.storage.get('articleData').then((vals) => {
        console.log(vals);
       let articleId = JSON.parse(vals).data.articleId
        this.storage.get('user').then((val) => {
         let token = val.data.token;
          $this.artcleService.publishArticle({
            strategy:1
          },articleId,token).subscribe((res) =>{
            console.log(res);
            if(res.code == "200"){
              $this.app.getRootNav().push(TabsPage);
              let alert = this.alertCtrl.create({
                title: "提示",
                subTitle: '发布成功',
                buttons: ['OK']
              });
              alert.present();
            }else{
              let alert = this.alertCtrl.create({
                title: "警报",
                subTitle: '服务器内部错误',
                buttons: ['OK']
              });
              alert.present();
            }
          })

        })

      })
    }else if(this.relationship == "2"){
      this.app.getRootNav().push("ArticleIssueFourPage",{
        data:"2"
      })
    }else{
      this.app.getRootNav().push("ArticleIssueFourPage",{
        data:"3"
      })
    }
  }

}
