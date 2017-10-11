import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
// import {GroupShoppingPage} from "../group-shopping/group-shopping";
import {ArticleService} from "../../services/article";
import { Storage } from '@ionic/storage';
import {tryCatch} from "rxjs/util/tryCatch";
import {DomSanitizer} from "@angular/platform-browser";
import {VideiPlayPage} from "../videi-play/videi-play";
import {SearchPage} from "../search/search";
import { AppOnChangeSunject1 } from "../../services/article";

/**
 * Generated class for the GroupPurchasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-purchase',
  templateUrl: 'group-purchase.html',
})
export class GroupPurchasePage {
  dataList :any = [];
  imgurl:string = "http://loupai.6655.la:20503/api/static/image/";
  userid :any = "";
  token:any = "";
  pageNo:number = 1;
  pageSize:number = 3;
  infiniteScroll:any;
  maxData:any;
  imageUrl: any = "assets/img/my-touxiang.png";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app:App,
    private storage: Storage,
    private artcleService: ArticleService,
    private sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
  ) {
    this.initial();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPurchasePage');
    this.userinit()
    /*组建之间通讯啊*/
    AppOnChangeSunject1.updatauser.subscribe(res => {
      if (res == 200) {
        // this.getUserAddress();//重新获取最新的数据
        this.userinit()
      }
    });

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
  initial (){
    let $this = this;
    let Promises = new Promise((rel,err) =>{
      let $this :any = this;
      $this.storage.get('user').then((val) => {
        try{
          this.token = val.data.token;
          this.userid =  val.data.userId;
        }catch (err){
          this.token = undefined;
          this.userid =  undefined;
        }
        this.artcleService.getGroupShoppingList({
          pageNo:$this.pageNo,
          pageSize:$this.pageSize,
          userId:this.userid
        },this.token).subscribe((res) =>{
          console.log(res);
          $this.maxData = res;
          // $this.dataList.push(res.data.list);
          $this.dataList = $this.dataList.concat(res.data.list);
          console.log($this.dataList);
          for(let i =0;i<$this.dataList.length;i++){
            $this.dataList[i].videoUrl1 =  $this.dataList[i].videoUrl;
            $this.dataList[i].videoUrl2 = $this.sanitizer.bypassSecurityTrustResourceUrl($this.dataList[i].videoUrl);
            let ionicurl :any=$this.dataList[i];
            if(ionicurl.isLike == "1"){
              $this.dataList[i].likeimgUrl = "assets/img/like.png";
            }else{
              ionicurl.likeimgUrl = "assets/img/likeDefa.png";
            }
            if(ionicurl.isCollect == "1"){
              ionicurl.collectimgUrl="assets/img/collect.png";
            }else{
              ionicurl.collectimgUrl="assets/img/collectDefa.png";
            }
            ionicurl.shareimgUrl="assets/img/shareDefa.png";
          }
          console.log($this.dataList);
          rel();
        })
      });
    })

    return new Promise((rel,err) =>{
      Promises.then(() =>{
        console.log(this.maxData);
        if($this.pageSize*$this.pageNo >= this.maxData.data.total){
          err();
        }else{
          rel();
        }
      })
    })
  }
  goTopage(event,data,index,comment = false){
    if(comment){
      this.app.getRootNav().push('VideiPlayPage',{
        data:JSON.stringify(data)
      })
    }else{
      if(this.dataList[index].isBuy == "0"){
        this.app.getRootNav().push("GroupShoppingPage",{
          data:JSON.stringify(data)
        })
      }else{
        this.app.getRootNav().push('VideiPlayPage',{
          data:JSON.stringify(data)
        })

      }
    }
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
      let data: any = $this.dataList[index];
      let str = data[key].split(".")[0];
      if (str.substring(str.length - 4, str.length) == "Defa") {
        parms.action = "1";
      } else {
        parms.action = "0";
      }
      $this.artcleService.groupchange(parms, $this.token, $this.dataList[index].teamBuyId, $this.userid).subscribe((res) => {
        if (res.code == "200") {
          let numkey: any = key.substring(0, key.length - 6) + "Num";
          if (str.substring(str.length - 4, str.length) == "Defa") {
            data[key] = str.substring(0, str.length - 4) + ".png"
            $this.dataList[index][numkey]++;
          } else {
            data[key] = str.substring(0, str.length) + "Defa.png"
            $this.dataList[index][numkey]--;
          }
        }

      })
    })




    // )

  }
  /*验证当请用户是否登陆*/
  getuserID(){
    let $this = this;
    return new Promise((res,errs) =>{
      $this.storage.get('user').then((val) => {
        try {
          $this.userid = val.data.userId;
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
  /*跳转搜索页面*/
  itemTapped(event) {
    this.app.getRootNav().push('SearchPage')
  };
  doInfinite(infiniteScroll) {
    this.pageNo++
    let fun :any = this.initial();
    fun.then(() =>{
      infiniteScroll.complete();
    },() =>{
      infiniteScroll.enable(false);
    })
  }
}
