import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {FileItem, FileUploader}from "ng2-file-upload";
import {DomSanitizer} from "@angular/platform-browser";
import { ArticleService } from "../../services/article";
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {App} from "ionic-angular/components/app/app";
import { ArticleIssueOnePage } from '../articleIssue/article-issue-one/article-issue-one';
/**
 * Generated class for the GroupBuyingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'editor',
  templateUrl: 'editor.html',
})
export class EditorPage {


  text2: number;
  title:string = "";
  img:any = "assets/img/defaultImg.png";
  url:any = "";
  relationship:string = "1";
  imageUrl:any = "assets/img/defaultImg.png";

  /*图片相关*/
  // uploader:FileUploader = new FileUploader({
  //   url: "http://www.download.com:80/uploadFile",
  //   method: "POST",
  //   itemAlias: "uploadedfile"
  // });


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    private artcleService: ArticleService,
    public app:App,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupBuyingPage');
  }
  show(event){
    this.text2 = event.textValue.length - 1
  }
  // onAfterAddingFile(fileItem:FileItem){
  // console.log(fileItem);
  // }
  onChangeSelectFile(event){
    const file = event.currentTarget.files[0];
    // this.UserInfo[field] = file;
    // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    console.log(event)
  }
  next(){
    let $this:any = this;
    if(this.title.length >0){
      let userId:string="";
      $this.storage.get('user').then((val) => {
        let data :any = {
          userId:val.data.userId,
          title:$this.title
        }
        this.artcleService.creation(data) .subscribe((res) =>{
          let articleData:any = res;
          console.log(res);
          console.log(JSON.parse(articleData._body).code);
          if(JSON.parse(articleData._body).code == "200"){
            $this.storage.set('articleData',articleData._body);
            $this.app.getRootNav().push("ArticleIssueOnePage");
          }
        },(err) => {
          console.log(err);
          alert(err);
        })
      });




    }else{
      let alert = this.alertCtrl.create({
        title: "警报",
        subTitle: '请输入标题',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
