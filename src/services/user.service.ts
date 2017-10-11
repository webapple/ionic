import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// import { Headers, HTTP } from '@ionic-native/http';

import { Subject } from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';

import { LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';


declare var window: any;

@Injectable()
export class AppGlobal {

    static domain = "http://loupai.6655.la:20503/api/" // http://loupai.6655.la:20503

    static imgurl = 'http://loupai.6655.la:20503/api/static/image/';

    static API: any = {
        // HOME
        getArticle: 'article?',
        getArticleLcr: 'article/lcr/',
        getComment: 'article/comment/list?',
        getCommentStar: 'article/comment',
        addComment:'/article/comment',
        getArticleDeatail: 'article/',
        // FOUND
        getDiscover: 'discover/user?',
        getFollow: '/notify/user?',
        getSearchUser: 'search?',
        // MY
        getCollect: '/collect/user?',
        getMyArticle: '/user/articles?',
        getMyUser: '/notify/user?'
    };

}


@Injectable()
export class UserService {

  loading;
  imgurl = 'http://loupai.6655.la:20503/api/static/image/';
  userId;
  userToken;
  constructor( public http: Http, public loadingCtrl: LoadingController, public storage: Storage,) {
    // this.storageGet()
    //
    // AppOnChangeSunject.LoginOnChange.subscribe(res => {
    //   if (res == 200) {
    //     this.storageGet();//重新获取最新的数据
    //     console.log(this.userToken)
    //     console.log(this.userId)
    //   }
    // });
  }

  // storageGet() {
  //   this.storage.get('user').then((val) => {
  //     if (val) { //  && val._id
  //       this.userId = val.data.userId
  //       this.userToken = val.data.token
  //     } else {
  //       this.userId = undefined
  //       this.userToken = undefined
  //     }
  //   });
  // }

  encode(params) {
      var str = '';
      if (params) {
          for (var key in params) {
              if (params.hasOwnProperty(key)) {
                  var value = params[key];
                  str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
              }
          }
          str = '?' + str.substring(0, str.length - 1);
      }
      return str;
  }

  encoded(obj){
    let str = [];
    for(let p in obj){
      if(Array.isArray(obj[p])){
        const arr = obj[p]
        if(arr.length===0){
          str.push(encodeURIComponent(p) + "=" +"");
        }
         for(let i=0;i<arr.length;i++){
           str.push(encodeURIComponent(p) + "=" +arr[i]);
         }
      }
      else
        str.push(encodeURIComponent(p) + "=" +obj[p]);
    }
    return str.join("&");
  }

  httpGet(token, url, params, callback, loader: boolean = false) {
    let loading = this.loadingCtrl.create({});
    if (loader) {
      loading.present();
    }

    let headers = new Headers();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    if(token) {
      headers.set("Authorization", token);
    }

    this.http.get(AppGlobal.domain + url + this.encoded(params), { headers: headers })
      .subscribe((res) => {
        let d = res.json()
        if (loader) {
          loading.dismiss();
        }
        callback(d)
      })
  }

  httpPost(token, url, params, callback, loader: boolean = false) {
    let loading = this.loadingCtrl.create({});
    if (loader) {
      loading.present();
    }

    let headers = new Headers();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    if(token) {
      headers.set("Authorization", token);
    }

    this.http.post(AppGlobal.domain + url, this.encoded(params), { headers: headers })
      .subscribe((res) => {
        let d = res.json()
        if (loader) {
          loading.dismiss();
        }

        callback(d)
      })
  }

  httpPut(token, url, params, callback, loader: boolean = false) {
    let loading = this.loadingCtrl.create({});
    if (loader) {
      loading.present();
    }

    let headers = new Headers();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    if(token) {
      headers.set("Authorization", token);
    }

    this.http.put(AppGlobal.domain + url, this.encoded(params), { headers: headers })
      .subscribe((res) => {
        let d = res.json()
        if (loader) {
          loading.dismiss();
        }

        callback(d)
      })
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: '正在加载中...'
    });
    this.loading.present();
  }

  presentLoadingDismiss() {
    this.loading.dismiss();
  }

}

export const AppOnChangeSunject = {
    OrderAddressOnChange:new Subject<any>(),
    FollowListOnChange:new Subject<any>(),
    StarsOnChange:new Subject<any>(),
    CommentListOnChange:new Subject<any>(),
    LoginOnChange:new Subject<any>(),
}
