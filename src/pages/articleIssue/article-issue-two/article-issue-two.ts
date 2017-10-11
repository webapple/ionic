import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import { Storage } from '@ionic/storage';
import { ArticleService } from "../../../services/article";
import {ArticleIssueThreePage} from "../article-issue-three/article-issue-three";
import {App} from "ionic-angular/components/app/app";
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the ArticleIssueTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-issue-two',
  templateUrl: 'article-issue-two.html',
})
export class ArticleIssueTwoPage {
  imageUrl:any = "assets/img/defaultImg.png";
  index:boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
   private sanitizer: DomSanitizer,
    private storage: Storage,
    private artcleService: ArticleService,
    public app:App,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
  }

  url = 'http://loupai.6655.la:20503/api/';

  onChangeSelectFile(event,img){
    let $this = this;
    const file = event.currentTarget.files[0];
    // alert('你选择的文件大小' + (file.size / 1024).toFixed(0) + "kb");
    /*限制图片上传的大小*/
    let imgsize:number = Number((file.size / 1024).toFixed(0));
    if( imgsize >= 10230){
      this.alter("警报","图片占用空间过大");
    }else{
      const loading = this.loadingCtrl.create({
        content: '正在上传...'
      });

      loading.present();
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      console.log(event);
      // let fromdata = new FormData();
      $this.storage.get('articleData').then((vals) => {
        console.log(JSON.parse(vals).data.articleId);
        // this.uploader = new FileUploader({
        //   url:"http://loupai.6655.la:20503/api/" + JSON.parse(vals).data.articleId,
        //   method: "POST"
        // });

        $this.storage.get('articlmain').then((val) => {

          let imgdata = new FormData();
          imgdata.append("title",JSON.parse(vals).data.title);
          imgdata.append("content",val);
          imgdata.append("file",file);

          this.storage.get('user').then((val) => {
            // this.userToken = val.data.token
            $this.artcleService.imgsubmit(imgdata,JSON.parse(vals).data.articleId,val.data.token).subscribe((res) =>{
              console.log(res);
              loading.dismiss();
              if(res.code == 200){
                this.index = true;
              }else if(res.code == 400){
                this.alter("警报","身份信息过期，请重新登陆");
              }else{
                this.alter("警报","服务器内部错误，");
              }
            })
            if (val) { //  && val._id
              // this.userToken = undefined
              $this.artcleService.imgsubmit(imgdata,JSON.parse(vals).data.articleId,val.data.token).subscribe((res) =>{
                console.log(res);
              })
              return val.data.token
            } else {

            }
          });


        });


      })

    }
    console.log(file);
    // this.UserInfo[field] = file;
    // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleIssueTwoPage');

  }
  next(){
    let $this :any = this;
    if(this.index){
      $this.app.getRootNav().push("ArticleIssueThreePage");
    }else{
      let alert = this.alertCtrl.create({
        title: "警报",
        subTitle: '请选择封面',
        buttons: ['OK']
      });
     this.alter("警报","请选择封面");

    }
  }
  alter(title,content){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }

}
