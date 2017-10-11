import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import {ArticleService} from "../../services/article";
import { Storage } from '@ionic/storage';


/**
 * Generated class for the GroupShoppingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-shopping',
  templateUrl: 'group-shopping.html',
})
export class GroupShoppingPage {
  card: any;
  relationship:string = "1";
  bottonText:string = "预约";
  token:any;
  userid:any;
  barShow:boolean = true;
  time:any = "2017-12-05";
  imgurl:string = "http://loupai.6655.la:20503/api/static/image/";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    private artcleService: ArticleService,
    private storage: Storage,
    public alertCtrl:AlertController
  ) {
    this.card =JSON.parse( navParams.get('data'));
    console.log(this.card);
    if(this.card.isSub == "0"){
      this.bottonText = "预约";
      this.barShow = false
    }else {
      this.bottonText = "取消预约";
      this.barShow = true
    };
    if(this.card.isSubStart == "1"){
      this.time = this.card.endSubTime;
    }
    if(this.card.isBuyStart == "1"){
      this.time = this.card.endBuyTime;
    }

    this.card.videoUr2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.card.videoUrl1);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupShoppingPage');


    let Dom:any;
    if(this.card.isSub == "1"){
      Dom =  document.getElementById("videocontainer12").lastElementChild;
      if(this.card.yetBuyNum == "0"){
        Dom.style.width = "0%"
      }else{
        Dom.style.width = this.card.yetBuyNum +""+ this.card.reqBuyNum + "%"
      }
    }

  }
  sub(){
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
        userId:this.userid,
        teamBuyId: this.card.teamBuyId,
        action:"0"
      }
      if(this.bottonText == "预约"){
        data.action = "1";
      }else{
        data.action = "0";
      }
      $this.artcleService.videoSub(data,this.token).subscribe((res) => {
        console.log(res);
        $this.getdata();
        if(res.code == 200){
          if(data.action == "1"){
            this.bottonText = "取消预约";
            this.barShow = true
          }else{
            this.bottonText = "预约";
            this.barShow = false
          }
        }
      })
    })
  }
  getdata(){
    this.artcleService.getdetails(this.card.teamBuyId,this.token).subscribe((res) =>{
      console.log(res);
      if(res.code == "200"){
        // this.card = res.data



      }

    })
  }


}
