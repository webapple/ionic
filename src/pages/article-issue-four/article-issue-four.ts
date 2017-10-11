import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ArticleService} from "../../services/article";
import {TabsPage} from "../tabs/tabs";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ArticleIssueFourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-issue-four',
  templateUrl: 'article-issue-four.html',
})
export class ArticleIssueFourPage {
  lastData:string;
  ngif:boolean;
  valuepri:number=0.00;
  valuenum:number=0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app:App,
    private artcleService: ArticleService,
    private storage: Storage,
    public alertCtrl: AlertController
  ) {
    this.lastData = navParams.get('data');
    if(this.lastData == "2"){
      this.ngif = true;
    }else{
      this.ngif = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleIssueFourPage');
  }
  next(){
    let $this :any = this;
      this.storage.get('articleData').then((vals) => {
        console.log(vals);
        let articleId = JSON.parse(vals).data.articleId
        this.storage.get('user').then((val) => {
          let token = val.data.token;
          let data:any;
          if(this.lastData == "2"){
            data = {
              strategy: "2",
              freeNum:this.valuenum,
              articlePrice:this.valuepri
            }
          }else{
            data = {
              strategy: "3",
              articlePrice:this.valuepri
            }
          }
          this.artcleService.publishArticle(data,articleId, token).subscribe((res) => {
            console.log(res);
            if (res.code == "200") {
              let alert = this.alertCtrl.create({
                title: "提示",
                subTitle: "文章发布成功",
                buttons: ['OK']
              });
              $this.app.getRootNav().push("tabs-page");
              alert.present();
            } else {
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

  }

}
