import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ArticleService} from "../../services/article";
import { Storage } from '@ionic/storage';
import {DomSanitizer} from "@angular/platform-browser";
import {GroupShoppingPage} from "../group-shopping/group-shopping";
import {VideiPlayPage} from "../videi-play/videi-play";
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  text : string = "";

/*t团购模板上的变量*/
  dataList :any = [];
  imgurl:string = "http://loupai.6655.la:20503/api/static/image/";
  userid :any = "";
  token:any = "";
  pageNo:number = 1;
  pageSize:number = 3;
  infiniteScroll:any;
  maxData:any;
  ifshow1:boolean = true;
  ifshow2:boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private artcleService: ArticleService,
    private storage: Storage,
    private sanitizer: DomSanitizer,
    public app:App,
    public alertCtrl: AlertController,
  ) {
    // this.initial()
    this.storage.get("historySearch").then((val) =>{
      this.items = val;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  changes(text){
    this.text = text;
  }
  /*本地储存搜索的历史*/
  historySearch(text){
    this.storage.get("historySearch").then((val) =>{

      try {
        console.log(val.length);
      }
      catch (err){
        this.storage.set("historySearch",[]);
      }
      if(val.length >9){
        val.splice(9,1);
      }
      if(text != val[0] && text != ""){
        val.unshift(text);
      }
      this.storage.set("historySearch",val);
    })
  }
  items:any=[
    "C++成神之路",
    "颈椎病康复之路",
    "感动中国十大人物之非死即伤坐轮椅讲故事"
  ];
  search(){
    let $this = this;
    this.storage.get("user").then((val) =>{
      try {
        $this.token = val.data.token;
        $this.userid = val.data.userId;
      } catch (err) {
        $this.token = undefined;
        $this.userid = undefined;
      }
    })
    let data:any;
    data = {
      type:"3",
      keyWord:this.text,
      pageNo:"1",
      pageSize:$this.pageSize,
      userid:$this.userid
    }
    $this.artcleService.search(data,$this.token).subscribe((res) => {
      console.log(res);
    })
  }

  /*团购页面模板初始化*/
  initial (index = 0){
    let $this = this;
    this.historySearch(this.text);
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
        let data = {
          type:"3",
          keyWord:this.text,
          pageNo:"1",
          pageSize:$this.pageSize,
          userid:$this.userid
        };
        $this.artcleService.search(data,$this.token).subscribe((res) =>{
          console.log(res);
          if(res.code == 200){
            this.ifshow1 = false;
          }
          if(res.data.list.length == 0){
            this.ifshow2 = true;
          }else{
            this.ifshow2 = false;
          }

          $this.maxData = res;
          // $this.dataList.push(res.data.list);
          if(index == 1){
            $this.dataList = res.data.list;
          }else{
            $this.dataList = $this.dataList.concat(res.data.list);
          }
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
    });

    return new Promise((rel,err) =>{
      Promises.then(() =>{
        console.log(this.maxData);
        if($this.pageSize*$this.pageNo >= this.maxData.data.total){
          rel(500)
        }else{
          rel(200);
        }
      })
    })
  }
/*跳转到相应的播放或者购买页面*/
  goTopage(event,data,index,comment = false){
    if(comment){
      this.app.getRootNav().push('VideiPlayPage',{
        data:JSON.stringify(data)
      })
    }else{
      if(this.dataList[index].isBuy == "0"){
        this.app.getRootNav().push('GroupShoppingPage',{
          data:JSON.stringify(data)
        })
      }else{
        this.app.getRootNav().push('VideiPlayPage',{
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
  /*点赞收藏*/
  change(index,key,type) {
    /*后台数据相关*/
    /*验证游湖是否登陆*/
    let $this = this;
    this.getuserID().then(() => {
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
  }

  doInfinite(infiniteScroll) {
    this.pageNo++
    let fun :any = this.initial();
    fun.then((code) =>{
      if(code == 200){
        infiniteScroll.complete();
      }else if( code == 500){
        infiniteScroll.enable(false);
      }
    })
  }



  }
