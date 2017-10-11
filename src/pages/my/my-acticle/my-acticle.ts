import { Component } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService, AppGlobal } from "../../../services/user.service"
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MyActiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-acticle',
  templateUrl: 'my-acticle.html',
})
export class MyActiclePage {
  controlTab = 'release';
  items: any = [];
  items1: any = []
  data:any = [];
  parmas: any = {
    userId: '',
    state: 1,
    pageNo: 1,
    pageSize : 100
  }
  imgurl;
  userId: String;
  userToken;
  constructor(public userService: UserService,
              public storage: Storage,
              public navCtrl: NavController, public navParams: NavParams,
              private sanitizer: DomSanitizer,) {
    this.imgurl = this.userService.imgurl;
    this.getMyArticle()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyActiclePage');
  }

  isRelease(name) {
    this.controlTab = name
    if(name == 'release') {
      this.getMyArticle()
    } else {
      this.getDraftArticle()
    }
  }

  getMyArticle() {
    this.storage.get('user').then((val) => {
      if (val) { //  && val._id
        this.userId = val.data.userId
        this.userToken = val.data.token
      } else {
        this.userId = undefined
        this.userToken = undefined
      }

      this.parmas.userId = this.userId
      this.parmas.state = 1
      this.parmas.pageNo = 1
      this.parmas.pageSize = 20
      console.log('MyArticle Params', this.parmas)
      this.userService.httpGet(this.userToken, AppGlobal.API.getMyArticle, this.parmas, rs => {
        console.log('myArticle Data', rs)
        this.items = rs.data.list
        this.parmas.pageNo += 1
        this.addAtttr(rs.data.list);
      })

    });



  }

  doInfinite(infiniteScroll) {

    this.userService.httpGet(this.userToken, AppGlobal.API.getMyArticle, this.parmas, rs => {
      console.log('myArticle Data', rs)
      if (rs.data.list.length > 0) {
        this.items = this.items.concat(rs.data.list);
        this.parmas.pageNo += 1;
        this.addAtttr(this.items);
      } else {
        infiniteScroll.enable(false);
        console.log("没有数据啦！")
      }
    })

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1200);
  }

  getDraftArticle() {
    this.storage.get('user').then((val) => {
      if (val) { //  && val._id
        this.userId = val.data.userId
        this.userToken = val.data.token
      } else {
        this.userId = undefined
        this.userToken = undefined
      }

      this.parmas.userId = this.userId
      this.parmas.state = 0
      this.parmas.pageNo = 1
      this.parmas.pageSize = 50
      console.log('MyArticle 草稿箱 Params', this.parmas)
      this.userService.httpGet(this.userToken, AppGlobal.API.getMyArticle, this.parmas, rs => {
        console.log('myArticle 草稿箱 Data', rs)
        this.items1 = rs.data.list
        this.parmas.pageNo += 1;
      })

    });






  }

  doInfinite1(infiniteScroll) {

    this.userService.httpGet(this.userToken, AppGlobal.API.getMyArticle, this.parmas, rs => {
      console.log('myArticle 草稿箱 doInfinite1 Data', rs)
      if (rs.data.list.length > 0) {
        this.items1 = this.items1.concat(rs.data.list);
        this.parmas.pageNo += 1;
      } else {
        infiniteScroll.enable(false);
        console.log("没有数据啦！")
      }
    })

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1200);
  }

  addAtttr(dataList){
    let addAttrbute = (dataList) => {
      let $this = this;

      for(let i =0;i<dataList.length;i++){
        if(dataList[i].type == "团购视频"){
          dataList[i].videoUrl1 =  dataList[i].videoUrl;
          dataList[i].videoUrl2 = $this.sanitizer.bypassSecurityTrustResourceUrl(dataList[i].videoUrl);
          let ionicurl :any=dataList[i];
          ionicurl.likeimgUrl = "assets/img/likeDefa.png";
          if(ionicurl.isCollect == "1"){
            ionicurl.collectimgUrl="assets/img/collect.png";
          }else{
            ionicurl.collectimgUrl="assets/img/collectDefa.png";
          }
          if(ionicurl.type == "文章"){
            ionicurl.ifShow = false
          }else{
            ionicurl.ifShow = true
          }
          ionicurl.shareimgUrl="assets/img/shareDefa.png";
        }

      }
      this.items =  dataList;
      console.log(this.items);
      // $this.dataList = dataList;
      // $this.data = $this.data.concat(dataList);
    };
    addAttrbute(dataList);
  }
}
