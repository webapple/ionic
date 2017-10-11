import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import {ArticleService} from "../../services/article";
import { Storage } from '@ionic/storage';
import { CommentPage} from '../comment/comment'
import { AppOnChangeSunject1 } from '../../services/article';
/**
 * Generated class for the VideiPlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videi-play',
  templateUrl: 'videi-play.html',
})
export class VideiPlayPage {
  card:any ;
  token:any;
  userid:any;
  show:boolean;
  videoShow:boolean;
  commentList:any;
  password:string = "购买视频，获得视频密码";
  imgurl:string = "http://loupai.6655.la:20503/api/static/image/";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
     private sanitizer: DomSanitizer,
    private artcleService: ArticleService,
    private storage: Storage,
    public modalCtrl: ModalController,
    public alertCtrl:AlertController

  ) {
    this.card =JSON.parse( navParams.get('data'));
    console.log(this.card);
    if(this.card.isBuy == "0"){
      this.videoShow = true;
    }else{
      this.videoShow = false;
      this.password = this.card.password;
    }
    this.card.videoUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.card.videoUrl1);
    let $this :any = this;
    function init(){
      $this.storage.get('user').then((val) => {
        try {
          $this.token = val.data.token;
          $this.userid = val.data.userId;
        } catch (err) {
          $this.token = undefined;
          $this.userid = undefined;
        }
        $this.artcleService.getTeamcommentList({
          teamBuyId:$this.card.teamBuyId,
          userId:$this.userid,
          pageNo:"1",
          pageSize:"100"
        },$this.token).subscribe((res) =>{
          console.log(res);
          if(res.data.list.length == "0"){
            $this.show = true;
          }else{
            $this.show = false;


            for(let i =0;i<res.data.list.length;i++){
              let ionicurl :any=res.data.list[i];
              if(ionicurl.isLike == "1"){
                ionicurl.likeimgUrl = "assets/img/like.png";
              }else{
                ionicurl.likeimgUrl = "assets/img/likeDefa.png";
              }
            }


            $this.commentList = res.data.list;
            console.log($this.commentList)
          }
        })
      });
    }
    init();


    /*组建之间通讯啊*/
    AppOnChangeSunject1.AddressListOnChange.subscribe(res => {
      if (res == 200) {
        // this.getUserAddress();//重新获取最新的数据
        init();
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideiPlayPage');
  }
  presentModal(){
    let myModal = this.modalCtrl.create("CommentPage",{
      teamBuyId:this.card.teamBuyId
    });
    myModal.present();
  }
  like(index){
    let data = {
      commentId:this.commentList[index].commentId,
      action:"",
      userId:this.userid
    };
    console.log(this.commentList[index].isLike);
    if(this.commentList[index].isLike == "1"){
      data.action = "0";
    }else{
      data.action = "1";
    }
    this.artcleService.getlike(data,this.token).subscribe((res) =>{
      console.log(res);
      if(res.code == "200"){
        if(this.commentList[index].isLike == "0"){
          this.commentList[index].likeimgUrl = "assets/img/like.png";
          this.commentList[index].likeNum++;
          this.commentList[index].isLike = "1";
        }else{
          this.commentList[index].likeimgUrl= "assets/img/likeDefa.png";
          this.commentList[index].likeNum--;
          this.commentList[index].isLike = "0";
        }
      }
    })
  }

  videoShowfun(){
    // this.videoShow = false;
    let prompt = this.alertCtrl.create({
      title: '密码',
      message: "请输入团购视频密码",
      inputs: [
        {
          name: 'title',
          placeholder: '密码'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
           // if(data == this.card.password){
           //   this.videoShow = false;
           // }
            this.videoShow = false;
          }
        }
      ]
    });
    prompt.present();
  }
}
