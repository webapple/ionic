import { Component, Input } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { App } from "ionic-angular/components/app/app";
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ArticleDetailPage } from "../article-detail/article-detail";
import { UserService } from "../../services/user.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ArticleService} from "../../services/article";
/**
 * Generated class for the PagesChoicenessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-choiceness',
  templateUrl: 'pages-choiceness.html',
})
export class PagesChoicenessPage {
  @Input() data: any = {};
  @Input() isSubject: boolean = true;
  // active:string = 'choiceness';
  //
  // items = [];
  // items1 = [];
  // userId: String;
  //
  // hasmore: boolean = true;
  // parmas: any = {
  //   type: '',
  //   userId: '',
  //   pageNo: 1,
  //   pageSize: this.items.length || 20,
  // }
  // params1: any = {
  //   type: '',
  //   userId: '',
  //   pageNo: 1,
  //   pageSize: this.items.length || 20,
  // }

  imgurl;
  userid;
  token;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app:App, public storage: Storage,
              public userService: UserService,
              public http: Http,
              private sanitizer: DomSanitizer,
              public alertCtrl: AlertController,
              private artcleService: ArticleService,) {

    this.imgurl = this.userService.imgurl;

    // this.storageGet()
    // AppOnChangeSunject.AddressListOnChange.subscribe(res => {
    //   if (res == 200) {
    //     this.getProducts();//重新获取最新的数据
    //   }
    // })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesChoicenessPage');
  }

  goDetails(item) {
    this.app.getRootNav().push('ArticleDetailPage', {
      data: item
    })
  }

  goTopage(event,data,index,comment = false){

    if(comment){
      this.app.getRootNav().push("VideiPlayPage",{
        data:JSON.stringify(data)
      })
    }else{
      if(this.data[index].isBuy == "0"){
        this.app.getRootNav().push("GroupShoppingPage",{
          data:JSON.stringify(data)
        })
      }else{
        this.app.getRootNav().push("VideiPlayPage",{
          data:JSON.stringify(data)
        })

      }
    }
  }
  /*验证当请用户是否登陆*/
  getuserID(){
    let $this = this;
    return new Promise((res,errs) =>{
      $this.storage.get('user').then((val) => {
        try {
          $this.userid = val.data.userId;
          $this.token = val.data.token;
          res();
        } catch (err){

          let alert1 = this.alertCtrl.create({
            title: "警报",
            subTitle: '请先登录',
            buttons: ['OK']
          });
          alert1.present();
        }})
    });

  }
  change(index,key,type){
    /*后台数据相关*/
    /*验证用户是否登陆*/
    let $this = this;
    this.getuserID().then(() =>{
      let parms = {
        action: "1",
        type: type
      };
      let data: any = $this.data[index];
      let str = data[key].split(".")[0];
      if (str.substring(str.length - 4, str.length) == "Defa") {
        parms.action = "1";
      } else {
        parms.action = "0";
      }
      $this.artcleService.groupchange(parms, $this.token, $this.data[index].teamBuyId, $this.userid).subscribe((res) => {
        if (res.code == "200") {
          let numkey: any = key.substring(0, key.length - 6) + "Num";
          if (str.substring(str.length - 4, str.length) == "Defa") {
            data[key] = str.substring(0, str.length - 4) + ".png"
            $this.data[index][numkey]++;
          } else {
            data[key] = str.substring(0, str.length) + "Defa.png"
            $this.data[index][numkey]--;
          }
        }

      })
    })

  }

  // storageGet() {
  //
  //   this.storage.get('user').then((val) => {
  //     if (val) { //  && val._id
  //       this.userId = val.data.userId
  //     } else {
  //       this.userId = undefined
  //     }
  //     this.getProducts()
  //   });
  // }
  //
  // getProducts() {
  //   if(this.active == 'choiceness') {
  //     this.parmas.type = 1;
  //     this.parmas.userId = this.userId;
  //     this.parmas.pageSize = this.items.length || 5;
  //
  //     this.userService.httpGet(AppGlobal.API.getArticle, this.parmas, rs => {
  //
  //       this.items = this.items.concat(rs.data.list);
  //       this.parmas.pageNo += 1;
  //       console.log(rs)
  //     })
  //
  //   } else {
  //     this.params1.type = 2;
  //     this.params1.userId = this.userId;
  //     this.params1.pageSize = this.items1.length || 5;
  //
  //     this.userService.httpGet(AppGlobal.API.getArticle, this.params1, rs => {
  //       console.log('params1', rs)
  //       this.items1 = this.items1.concat(rs.data.list);
  //       this.params1.pageNo += 1;
  //
  //     })
  //
  //   }
  //
  //
  //
  // }

  // doInfinite(infiniteScroll) {
  //
  //   if(this.active == 'choiceness') {
  //       this.userService.httpGet(AppGlobal.API.getArticle, this.parmas, rs => {
  //
  //           if (this.hasmore == false) {
  //             console.log('this.hasmore', this.hasmore)
  //             return;
  //           }
  //
  //           if (rs.data.list.length > 0) {
  //             this.items = this.items.concat(rs.data.list);
  //             this.parmas.pageNo += 1;
  //           } else {
  //             this.hasmore = false
  //             console.log("没有数据啦！")
  //           }
  //           // this.items = rs.data.list;
  //           console.log('fs', rs)
  //       })
  //
  //       setTimeout(() => {
  //         infiniteScroll.complete();
  //       }, 1500);
  //     } else {
  //
  //       this.userService.httpGet(AppGlobal.API.getArticle, this.params1, rs => {
  //
  //         if (this.hasmore == false) {
  //           console.log('this.hasmore', this.hasmore)
  //           return;
  //         }
  //
  //         if (rs.data.list.length > 0) {
  //           this.items1 = this.items1.concat(rs.data.list);
  //           this.params1.pageNo += 1;
  //         } else {
  //           this.hasmore = false
  //           console.log("没有数据啦！")
  //         }
  //         // this.items = rs.data.list;
  //         console.log('fs', rs)
  //       })
  //
  //       setTimeout(() => {
  //         infiniteScroll.complete();
  //       }, 1500);
  //     }
  // }

}
