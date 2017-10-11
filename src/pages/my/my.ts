import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {App} from "ionic-angular/components/app/app";

import {ArticleService} from "../../services/article";
import { UserService } from "../../services/user.service";
import { Storage } from '@ionic/storage';
import { AppOnChangeSunject1 } from "../../services/article";


/**
 * Generated class for the MyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {
 username = "点击登录";
 token ;
 userid;
  imageUrl: any = "assets/img/my-touxiang.png";
  imgurl:string = "http://loupai.6655.la:20503/api/static/image/";
  constructor(
    public userService: UserService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public app:App,
    private artcleService: ArticleService,
    private storage: Storage,

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
    let init = () =>{
      let $this = this;
      $this.storage.get('user').then((val) => {
        try {
          $this.token = val.data.token;
          $this.userid = val.data.userId;
          $this.artcleService.getuserinfo($this.userid,$this.token).subscribe((res) =>{
            console.log(res);
            $this.imageUrl = $this.imgurl +res.data.headImgUrl;
            if( res.data.username != ""){
              $this.username = res.data.username;
            }else{
              $this.username = res.data.phone;
            }
          })
        } catch (err) {
          $this.token = undefined;
          $this.userid = undefined;
        }

      });
    }
    init()
    /*组建之间通讯啊*/
    AppOnChangeSunject1.updatauser.subscribe(res => {
      if (res == 200) {
        // this.getUserAddress();//重新获取最新的数据
        init()
      }
    });

  }

  itemTapped(event) {
    // this.app.getRootNav().push(LoginPage)
    this.checkLogin("UserinfoPage")
  };
  goSet(){
    // this.app.getRootNav().push(MySetPage);
    this.checkLogin("MySetPage")
  }
  goMessage(){
    // this.app.getRootNav().push(MyMessagePage)
    this.checkLogin("MyMessagePage")
  }
  goUserinfo(){
    // this.app.getRootNav().push(UserinfoPage)
    this.checkLogin("UserinfoPage")
  }
  goqianbao(){
    this.checkLogin("MinePage");
  }
  godigV(){
    // this.app.getRootNav().push(BigVPage,{
    //   data:{
    //     img:this.imageUrl,
    //     name:this.username
    //   }
    // });
    this.checkLogin("BigVPage",{
      data:{
        img:this.imageUrl,
        name:this.username
      }
    })
  }
  gotake(){
    // this.app.getRootNav().push(TakemaxPage,);
    this.checkLogin("TakemaxPage",{
      data:{
        img:this.imageUrl,
        name:this.username
      }
    });
  }

	CreateCollect() {
    this.checkLogin("MyCollectPage");
  }

  CreateFollow() {
    this.checkLogin("MyFollowPage");
  }

  CreateActicle() {
    this.checkLogin("MyActiclePage");
  }

  checkLogin(page,params?) {
    if (this.userid) {
      this.app.getRootNav().push(page,params);
    } else {
      this.app.getRootNav().push("LoginPage",params);
    }
  }
}
