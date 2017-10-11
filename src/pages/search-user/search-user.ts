import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService, AppGlobal } from "../../services/user.service";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-search-users',
   templateUrl: 'search-user.html',
 })

 export class SearchUsersPage {
   text: string = "";
   type: number;
   isShow: boolean = true;
   items: any = [];
   cache: any = []
   cache1: any = []
   hasmore: boolean = true;
   params: any = {
     type: '',
     keyWord: '',
     pageNo: 1,
     pageSize: 100,
     userId: ''
   }
   userId: String;
   userToken;
   constructor(public userService: UserService,
               public navCtrl: NavController, public navParams: NavParams, private storage: Storage,) {
     this.type = this.navParams.get('type');
     this.storageGet()
     this.storageGet1()

   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad SearchPage');
   }

   storageGet() {
     this.storage.get('cache').then((val) => {

       if (val) { //  && val._id
         this.cache = val;
       } else {
       }
     });

   }

   storageGet1() {
     this.storage.get('cache1').then((vall) => {
       if (vall) { //  && val._id
         this.cache1 = vall;
       } else {
       }
     });
   }

   searchUser(searchVal) {
     this.storage.get('user').then((val) => {
       if (val) { //  && val._id
         this.userId = val.data.userId
         this.userToken = val.data.token
       } else {
         this.userId = undefined
         this.userToken = undefined
       }

       this.hasmore = true;
       this.isShow = false;
       if(this.type == 1) {
         if(this.text.length > 0) {
           this.cache1.push(this.text)
         }
         this.storage.set('cache1', this.cache1)
       }

       if (this.type == 2) {
         if(this.text.length > 0) {
           this.cache.push(this.text)
         }
         this.storage.set('cache', this.cache)
       }

       this.params.type = this.type;
       this.params.keyWord = searchVal;
       this.params.pageNo = 1;
       this.params.pageSize = 5;
       this.params.userId = this.userId;

       this.userService.httpGet(this.userToken, AppGlobal.API.getSearchUser, this.params, rs => {
         // AppOnChangeSunject.AddressListOnChange.next(200);
         this.items = rs.data.list
         this.params.pageNo += 1;
       })

     });


   }

   doInfinite(infiniteScroll) {

    //  if (this.hasmore == false) {
    //
    //  }
     this.userService.httpGet(this.userToken, AppGlobal.API.getSearchUser, this.params, rs => {

       if (rs.data.list.length > 0) {
         this.items = this.items.concat(rs.data.list);
         this.params.pageNo += 1;
       } else {
         this.hasmore = false;
         infiniteScroll.enable(false);
         console.log("没有数据啦！")
       }
     })

     setTimeout(() => {
       infiniteScroll.complete();
     }, 1500);
   }

   change(text){
     this.text = text;
   }

   data:any=[
     "C++成神之路",
     "颈椎病康复之路",
     "感动中国十大人物之非死即伤坐轮椅讲故事"
   ]

 }
