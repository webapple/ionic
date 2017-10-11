import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ArticleService} from "../../services/article";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the UploadVideoPricePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-video-price',
  templateUrl: 'upload-video-price.html',
})
export class UploadVideoPricePage {
  valuepri:number=0.00;
  valuenum:number=0;
  lastData:any ="";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
   private storage: Storage,
    private artcleService: ArticleService,
    public app:App
  ) {
    // this.lastData =JSON.parse( navParams.get('data'));
    console.log(this.lastData);
    // $this.storage.get('groupShoppingdata').then((vals) => {})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadVideoPricePage');
  }
  next(){
    if(this.valuepri != 0 && this.valuenum != 0  ){
      let $this :any = this;
        $this.storage.get('user').then((val) => {
          let token = val.data.token;
          let userId = val.data.userId;
          $this.storage.get('groupShoppingdata').then((value) => {
            console.log(`${userId}&&${token}&&${value.title}`);
            let datass = {
              title:value.title,
              intro:value.intro,
              videoUrl:value.url,
              password:value.pass,
              price:$this.valuepri,
              reqBuyNum:$this.valuenum,
              userId:userId
            };
            $this.artcleService.groupshoppingBuy(datass,token).subscribe((res) => {
              console.log(res);
              if (res.code == "200") {
                let alert = this.alertCtrl.create({
                  title: "提示",
                  subTitle: "团购创建成功",
                  buttons: ['OK']
                });
                alert.present();
                $this.app.getRootNav().push(TabsPage);
              } else {
                let alert = this.alertCtrl.create({
                  title: "警报",
                  subTitle: '服务器内部错误',
                  buttons: ['OK']
                });
                alert.present();
              }
            });
          })
        })
    }else{
      let alert = this.alertCtrl.create({
        title: "警报",
        subTitle: '请选择价格和人数',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
