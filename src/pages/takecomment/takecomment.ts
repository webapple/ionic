import {Component, Input} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ArticleService} from "../../services/article";
import { Storage } from '@ionic/storage';
import {DomSanitizer} from "@angular/platform-browser";
import {VideiPlayPage} from "../videi-play/videi-play";
import {GroupShoppingPage} from "../group-shopping/group-shopping";
/**
 * Generated class for the TakecommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-takecomment',
  templateUrl: 'takecomment.html',
})
export class TakecommentPage {
  @Input() data:any = {};
  token;
  userid;
  pageSize:number = 10;
  pageNo:number = 1;
  dataList:any = [];
  imgurl:string = "http://loupai.6655.la:20503/api/static/image/";
  maxData;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app:App,
    private artcleService: ArticleService,
    private storage: Storage,
    private sanitizer: DomSanitizer,
  ) {
    this.init();
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakecommentPage');
  }
  init(){
    let inits  = (relss) =>{
      let $this = this;
      $this.storage.get('user').then((val) => {
          try {
            $this.token = val.data.token;
            $this.userid = val.data.userId;
          } catch (err) {
            $this.token = undefined;
            $this.userid = undefined;
          }
          let data = {
            userId:$this.userid,
            type:"2",
            pageNo:$this.pageNo,
            pageSize:$this.pageSize
          }
          $this.artcleService.getTakecommment(data,$this.token).subscribe((res) =>{
            console.log(res);
            if(res.code == 200){
              $this.maxData = res
              addAttrbute(res.data.list)
              relss()
            }else{
              alert("服务器错误")
            }
          })
        }
      )};

    /*添加属性（安全）*/
    let Promises = new Promise((rels,err) =>{
      inits(rels);
    })
    let addAttrbute = (dataList) => {
      let $this = this;
      for(let i =0;i<dataList.length;i++){
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
      // $this.dataList = dataList;
      $this.dataList = $this.dataList.concat(dataList);
    }
    return new Promise((relaa,erraa) =>{
      let $this = this;
      Promises.then(() =>{
        console.log(this.maxData);
        if($this.pageSize*$this.pageNo >= this.maxData.data.total){
          relaa(500);
        }else{
          relaa(200);
        }
      })
    })
  }
  goTopage(event,data,index,comment = false){
    if(comment){
      this.app.getRootNav().push("VideiPlayPage",{
        data:JSON.stringify(data)
      })
    }else{
      if(this.dataList[index].isBuy == "0"){
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
  doInfinite(infiniteScroll) {
    this.pageNo++
    let fun :any = this.init();
    fun.then((index) =>{
      if(index == 200){
        infiniteScroll.complete();
      }else{
        infiniteScroll.enable(false);
      }
    })
  }
}
