import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ArticleService} from "../../services/article";
import { Storage } from '@ionic/storage';
import { AppOnChangeSunject1 } from "../../services/article";

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  token:any;
  userid:any;
  content:any = "";
  contentlength:Number=0;
  teamBuyId:any;
  imgurl:string = "http://loupai.6655.la:20503/api/static/image/";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private artcleService: ArticleService,
    private storage: Storage,
    public alertCtrl: AlertController,
  ) {
    this.teamBuyId = navParams.get("teamBuyId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
  creation(){
    this.storage.get('user').then((val) => {
      try {
        this.token = val.data.token;
        this.userid = val.data.userId;
      } catch (err) {
        this.token = undefined;
        this.userid = undefined;
      }
      if(this.content == ""){
        let alert = this.alertCtrl.create({
          title: "提示",
          subTitle: '请输入文章内容',
          buttons: ['OK']
        });
        alert.present();
        return
      }

      this.artcleService.creationComment({
        userId:this.userid,
        content:this.content,
        teamBuyId:this.teamBuyId
      },this.token).subscribe((res) =>{
        console.log(res);
        if(res.code == "200"){
          AppOnChangeSunject1.AddressListOnChange.next(200);
          let data = { 'foo': 'bar' };
          this.viewCtrl.dismiss(data);
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
  }
  change(){
    this.contentlength = this.content.length
  }

}
