import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ArticleService} from "../../services/article";
import { Storage } from '@ionic/storage';
import {VideiPlayPage} from "../videi-play/videi-play";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the MyMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-message',
  templateUrl: 'my-message.html',
})
export class MyMessagePage {
  token:any;
  userid:any;
  datalist:any = [];
  pageNo :any = 1;
  pageSize:any = 30;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private artcleService: ArticleService,
    private storage: Storage,
    public app:App,
    private sanitizer: DomSanitizer,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyMessagePage');
   this.init();
  }
  /*页面初始化*/
  init(){
    return new Promise((rel ,err) =>{
      let $this = this;
      $this.storage.get('user').then((val) => {
        try {
          $this.token = val.data.token;
          $this.userid = val.data.userId;
        } catch (err) {
          $this.token = undefined;
          $this.userid = undefined;
        }
        $this.artcleService.getmyMessage({
          userId:$this.userid,
          pageNo:this.pageNo,
          pageSize:this.pageSize
        },this.token).subscribe((val) =>{
          console.log(val);
          if(val.code == 200){
            // this.datalist = val.data.list;
            $this.datalist = $this.datalist.concat(val.data.list);
            if($this.pageSize*$this.pageNo >= val.data.total){
              err();
            }else{
              rel();
            }
          }
        })
      })
    })
  }
  /*瀑布流*/
  doInfinite(infiniteScroll) {
    this.pageNo++;
    let fun :any = this.init();
    fun.then(() =>{
      infiniteScroll.complete();
    },() =>{
      infiniteScroll.enable(false);
    })
  }
  /*跳转到相应的团购视频页面*/
  gotoGroup(index){
    if(this.datalist[index].type == "团购"){
      let $this :any = this;
      $this.storage.get('user').then((val) => {
        try {
          this.token = val.data.token;
          this.userid = val.data.userId;
        } catch (err) {
          this.token = undefined;
          this.userid = undefined;
        }
        this.artcleService.getdetails(this.datalist[index].ids,this.token).subscribe((res) => {
          console.log(res);
          if(res.code == 200){
            let newdata:any;
            let team:any = res.data;
            team.videoUrl1 =  team.videoUrl;
            team.videoUrl2 = $this.sanitizer.bypassSecurityTrustResourceUrl(team.videoUrl);
              if(team.isLike == "1"){
                team.likeimgUrl = "assets/img/like.png";
              }else{
                team.likeimgUrl = "assets/img/likeDefa.png";
              }
              if(team.isCollect == "1"){
                team.collectimgUrl="assets/img/collect.png";
              }else{
                team.collectimgUrl="assets/img/collectDefa.png";
              }
            team.shareimgUrl="assets/img/shareDefa.png";
              console.log(team);
            this.app.getRootNav().push("VideiPlayPage",{
              data:JSON.stringify(team)
            })
          }else{
            alert("服务器内部错误，或文章团购已不存在")
          }
        })
      })
    }else{
      alert("等景瑞开发完接口");
    }

  }

}
