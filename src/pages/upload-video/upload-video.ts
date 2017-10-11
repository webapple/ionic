import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UploadVideoPricePage} from "../upload-video-price/upload-video-price";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UploadVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-video',
  templateUrl: 'upload-video.html',
})
export class UploadVideoPage {
  src = "https://v.qq.com/iframe/player.html?vid=x00244m4wxc&tiny=0&auto=0"
  title = "";
  intro = "";
  url:any ="";
  pass = "";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public app:App,
              private storage: Storage,
  ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadVideoPage');
    // document.getElementById("videocontainer").innerHTML = `<iframe frameborder="0" width="100%" src="https://v.qq.com/iframe/player.html?vid=x00244m4wxc&tiny=0&auto=0" allowfullscreen ></iframe>`
    // <iframe frameborder="0"  src="https://v.qq.com/iframe/player.html?vid=t0552poy8bz&tiny=0&auto=0" allowfullscreen></iframe>
  }
  blur(){
    if(this.url.substring(0,7) == "<iframe" && this.url.substring(this.url.length-7,this.url.length) == "iframe>"  ){
      document.getElementById("videocontainer").innerHTML = this.url;
      let Dom:any;
     Dom =  document.getElementById("videocontainer").lastElementChild;
     Dom.width = "100%";
     Dom.height = "150px";



    }else{
      let alert = this.alertCtrl.create({
        title: "警报",
        subTitle: '请输入正确的iframe的地址',
        buttons: ['OK']
      });
      alert.present();
    }




  }
  next(){
    if(this.title ==""){
      let alert = this.alertCtrl.create({
        title: "警报",
        subTitle: '标题不能为空',
        buttons: ['OK']
      });
      alert.present();
    }else if(this.url.substring(0,7) != "<iframe" && this.url.substring(this.url.length-7,this.url.length) != "iframe>"  ){
      let alert = this.alertCtrl.create({
        title: "警报",
        subTitle: '地址不能为空或格式不正确',
        buttons: ['OK']
      });
      alert.present();
    }else if(this.pass == ""){
      let alert = this.alertCtrl.create({
        title: "警报",
        subTitle: '密码不能为空',
        buttons: ['OK']
      });
      alert.present();
    }else if(this.url.substring(0,7) == "<iframe" && this.url.substring(this.url.length-7,this.url.length) == "iframe>"  ){
      document.getElementById("videocontainer").innerHTML = "";
      this.storage.set('groupShoppingdata',{
        title:this.title,
          intro:this.intro,
          url:this.url,
          pass:this.pass
      });
      setTimeout(() =>{
        this.app.getRootNav().push('UploadVideoPricePage');

      },300)
    }

  }

}
