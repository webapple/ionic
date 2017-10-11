import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { UserService, AppGlobal } from "../../../services/user.service"
import {DomSanitizer} from "@angular/platform-browser";
import { Storage } from '@ionic/storage';
import {ArticleService} from "../../../services/article";

/**
 * Generated class for the MyCollectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-collect',
  templateUrl: 'my-collect.html',
})
export class MyCollectPage {
  items: any = [];
  arr: any = [];
  params: any = {
    userId: '',
    pageNo: 1,
    pageSize: 5
  }
  Alength = 0;
  userId: String;
  userToken;
  userid;
  constructor(public userService: UserService,
              public navCtrl: NavController, public navParams: NavParams,
              private sanitizer: DomSanitizer,
              private storage: Storage,
              public alertCtrl: AlertController,
              private artcleService: ArticleService,) {
    this.getCollect()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCollectPage');
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

  getCollect() {

    this.storage.get('user').then((val) => {
      if (val) { //  && val._id
        this.userId = val.data.userId
        this.userToken = val.data.token
      } else {
        this.userId = undefined
        this.userToken = undefined
      }

      this.params.userId = this.userId;
      this.params.pageNo = 1;
      this.params.pageSize = 5;
      this.userService.httpGet(this.userToken, AppGlobal.API.getCollect, this.params, rs => {
        console.log('myCollect Data', rs)
        // this.params.pageNo += 1;
        this.params.pageSize += 5;
        this.items = rs.data;
        for( let i in rs.data) {
          this.arr.push(i)
          this.addAtttr(rs.data[i]);
        }
      })
    });


  }

  addAtttr(dataList){
    let addAttrbute = (dataList) => {
      let $this = this;

      for(let i =0;i<dataList.length;i++){
        if(dataList[i].type == "团购视频"){
          dataList[i].videoUrl1 =  dataList[i].videoUrl;
          dataList[i].videoUrl2 = $this.sanitizer.bypassSecurityTrustResourceUrl(dataList[i].videoUrl);
          let ionicurl :any=dataList[i];
          if(ionicurl.isLike == "1"){
            ionicurl.likeimgUrl = "assets/img/like.png";
          }else{
            ionicurl.likeimgUrl = "assets/img/likeDefa.png";
          }
          if(ionicurl.isCollect == "1"){
            ionicurl.collectimgUrl="assets/img/collect.png";
          }else{
            ionicurl.collectimgUrl="assets/img/collectDefa.png";
          }
          ionicurl.shareimgUrl="assets/img/shareDefa.png";
          if(ionicurl.type == "文章"){
            ionicurl.ifShow = false
          }else{
            ionicurl.ifShow = true
          }
          ionicurl.shareimgUrl="assets/img/shareDefa.png";
        }

      }
      console.log(dataList);
    };
    addAttrbute(dataList);
  }

  doInfinite(infiniteScroll) {

    this.userService.httpGet(this.userToken, AppGlobal.API.getCollect, this.params, rs => {
      console.log('myCollect Data doInfinite', rs)
      let Alength = 20;
      this.params.pageSize += 20;
      this.items = rs.data;
      this.arr = [];
      for( let i in rs.data) {
        this.arr.push(i)
        Alength += this.items[i].length;
        this.addAtttr(rs.data[i]);
      }
      console.log('Alength ', Alength )
      console.log('this.params.pageSize', this.params.pageSize)
      if(Alength < this.params.pageSize) {
        infiniteScroll.enable(false)
      }

    })

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1200);
  }
}
