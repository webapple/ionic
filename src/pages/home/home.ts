import { Component } from '@angular/core';

import { App } from "ionic-angular/components/app/app";
import {IonicPage, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserService, AppGlobal, AppOnChangeSunject } from "../../services/user.service";
import {ArticleService} from "../../services/article";
import { AppOnChangeSunject1 } from "../../services/article";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  active:string = 'recommend';
  isSubject: boolean = false;
  items = [];
  items1 = [];
  userId: String;
  userToken;

  hasmore: boolean = true;
  hasmore1: boolean = true;
  parmas: any = {
    type: '',
    userId: '',
    pageNo: 1,
    pageSize: this.items.length || 20,
  }
  params1: any = {
    type: '',
    userId: '',
    pageNo: 1,
    pageSize: this.items.length || 20,
  }
  imageUrl: any = "assets/img/my-touxiang.png";
  imgurl:string = "http://loupai.6655.la:20503/api/static/image/";
  token;
  userid;
  constructor(public userService: UserService,
              public navCtrl: NavController,
              public app:App,
              public storage: Storage,
              private artcleService: ArticleService,
              ) {
    // this.storageGet()

    this.getProducts()
    AppOnChangeSunject.StarsOnChange.subscribe(res => {
      if (res == 200) {
        this.getProducts();//重新获取最新的数据
      }
    });

    /*组建之间通讯啊*/
    this.userinit()
    AppOnChangeSunject1.updatauser.subscribe(res => {
      if (res == 200) {
        // this.getUserAddress();//重新获取最新的数据
        this.userinit()
      }
    });


  }

  ionViewDidLoad() {

  }
  aa() {

  }
  userinit(){
    let init = () =>{
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
          if(res.code == 200){
            $this.imageUrl = $this.imgurl +res.data.headImgUrl;
          }

        })
      });
    }
    init()
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
      this.getProducts()
    });
  }

  getProducts() {

    this.storage.get('user').then((val) => {
      if (val) { //  && val._id
        this.userId = val.data.userId
        this.userToken = val.data.token
      } else {
        this.userId = undefined
        this.userToken = undefined
      }

      if(this.active == 'choiceness') {
        this.parmas.type = 1;
        this.parmas.pageNo = 1;
        this.parmas.userId = this.userId
        // this.parmas.userId = this.userId;
        this.parmas.pageSize = 5;

        console.log('homeActicle Parmas', this.parmas)
        this.userService.httpGet(this.userToken, AppGlobal.API.getArticle, this.parmas, rs => {
          console.log('homeActicle Data', rs)
          this.items = rs.data.list;
          // this.items.concat(rs.data.list);
          this.parmas.pageNo += 1;

        })

      } else {
        this.params1.type = 2;
        this.params1.pageNo = 1;
        this.params1.userId = this.userId;
        this.params1.pageSize = 5;

        this.userService.httpGet(this.userToken, AppGlobal.API.getArticle, this.params1, rs => {

          this.items1 = rs.data.list;
          // this.items1.concat(rs.data.list);
          this.params1.pageNo += 1;

        })

      }

    });

  }

  itemTapped(event) {
    this.app.getRootNav().push('SearchUsersPage', {
      type: 2
    })
  };

  doInfinite(infiniteScroll) {

    if(this.active == 'choiceness') {

        console.log('Home Parmas doInfinite', this.parmas)
        this.userService.httpGet(this.userToken, AppGlobal.API.getArticle, this.parmas, rs => {
            console.log('Home Data doInfinite', rs)
            if (this.hasmore == false) {
              console.log('this.hasmore', this.hasmore)
              return;
            }

            if (rs.data.list.length > 0) {
              this.items = this.items.concat(rs.data.list);
              this.parmas.pageNo += 1;
            } else {
              this.hasmore = false
              infiniteScroll.enable(false);
              console.log("没有数据啦！")
            }

        })

        setTimeout(() => {
          infiniteScroll.complete();
        }, 1500);
      } else {

        this.userService.httpGet(this.userToken, AppGlobal.API.getArticle, this.params1, rs => {

          if (this.hasmore1 == false) {
            console.log('this.hasmore1', this.hasmore)
            return;
          }

          if (rs.data.list.length > 0) {
            this.items1 = this.items1.concat(rs.data.list);
            this.params1.pageNo += 1;
          } else {
            this.hasmore1 = false
            infiniteScroll.enable(false);
            console.log("没有数据啦！")
          }
        })

        setTimeout(() => {
          infiniteScroll.complete();
        }, 1500);
      }
  }

  doInfinite1(infiniteScroll) {

    if(this.active == 'choiceness') {

        console.log('Home Parmas doInfinite', this.parmas)
        this.userService.httpGet(this.userToken, AppGlobal.API.getArticle, this.parmas, rs => {
            console.log('Home Data doInfinite', rs)
            if (this.hasmore == false) {
              console.log('this.hasmore', this.hasmore)
              return;
            }

            if (rs.data.list.length > 0) {
              this.items = this.items.concat(rs.data.list);
              this.parmas.pageNo += 1;
            } else {
              this.hasmore = false
              infiniteScroll.enable(false);
              console.log("没有数据啦！")
            }

        })

        setTimeout(() => {
          infiniteScroll.complete();
        }, 1500);
      } else {

        this.userService.httpGet(this.userToken, AppGlobal.API.getArticle, this.params1, rs => {

          if (this.hasmore1 == false) {
            console.log('this.hasmore1', this.hasmore)
            return;
          }

          if (rs.data.list.length > 0) {
            this.items1 = this.items1.concat(rs.data.list);
            this.params1.pageNo += 1;
          } else {
            this.hasmore1 = false
            infiniteScroll.enable(false);
            console.log("没有数据啦！")
          }
        })

        setTimeout(() => {
          infiniteScroll.complete();
        }, 1500);
      }
  }

}
