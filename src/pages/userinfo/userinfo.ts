import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ArticleService} from "../../services/article";
import { Storage } from '@ionic/storage';
import {DomSanitizer} from "@angular/platform-browser";
import { AppOnChangeSunject1 } from "../../services/article";
/**
 * Generated class for the UserinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class UserinfoPage {
  imageUrl: any = "assets/img/my-touxiang.png";
  imgurl:string = "http://loupai.6655.la:20503/api/static/image/";
  token;
  userid;
  username:any = "";
  phone:any;
  file;
  imgshow:any = false;
  inputshow:any = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private artcleService: ArticleService,
              private storage: Storage,
              public app: App,
              private sanitizer: DomSanitizer,
              private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserinfoPage');
    let $this = this;
    $this.storage.get('user').then((val) => {
      try {
        $this.token = val.data.token;
        $this.userid = val.data.userId;
      } catch (err) {
        $this.token = undefined;
        $this.userid = undefined;
      }
      $this.artcleService.getuserinfo($this.userid,$this.token).subscribe((res) =>{
        console.log(res);
        $this.imageUrl = $this.imgurl +res.data.headImgUrl;
        $this.username = res.data.username;
        $this.phone = res.data.phone;
        })
    })
  }

  onChangeSelectFile(event) {
    let $this = this
    const file = event.currentTarget.files[0];
    this.file = event.currentTarget.files[0];
    // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    this.imgshow = true;
  }
  subData(file){
    let $this = this
    $this.storage.get('user').then((val) => {
      try {
        $this.token = val.data.token;
        $this.userid = val.data.userId;
      } catch (err) {
        $this.token = undefined;
        $this.userid = undefined;
      }
      let imgdata = new FormData();
      imgdata.append("username",$this.username);
      imgdata.append("file",file);
      $this.artcleService.setuserinfo(imgdata,$this.userid,$this.token).subscribe((res) => {
        console.log(res);
        if(res.code == "200" ){
          let alert = $this.alertCtrl.create({
            title:"提示",
            subTitle:"保存成功",
            buttons:['ok']
          });
          alert.present();
        };
        AppOnChangeSunject1.updatauser.next(200);
      })
    })
  }

  ionViewWillLeave(){
    if(this.imgshow || this.inputshow){
      let $this = this;
      let  confirm = this.alertCtrl.create({
        title:"提示",
        message:"是否保存更改",
        buttons:[
          {
            text:"确定",
            handler:() =>{
              $this.subData($this.file);
            }
          },
          {
            text:"取消",
            handler:() =>{

            }
          }
        ]
      });
      confirm.present();
    }

  }
  /*监测是否更改信息*/
  inputchenge(){
    this.inputshow = true;
  }
}
