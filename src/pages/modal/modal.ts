import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController  } from 'ionic-angular';
// import { ArticleIssueOnePage} from "../articleIssue/article-issue-one/article-issue-one"
import {App} from "ionic-angular/components/app/app";
import { EditorPage } from '../editor/editor';
import {UploadVideoPage} from "../upload-video/upload-video";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  userid:any;
  userIf:any;
  constructor(
    public navCtrl: NavController,
    public app:App,
    public viewCtrl: ViewController,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ModalPage');
  }
  itemTapped(event) {
    let $this = this
    this.getuserID().then( () =>{
        $this.app.getRootNav().push("EditorPage")
      }
    )
  };
  uploadvideo(event){
    let $this = this
    this.getuserID().then( () => {
        $this.app.getRootNav().push("UploadVideoPage")
     }
    )
  }
  getuserID(){
    let $this = this;
    return  new Promise((rel,err) => {
      $this.storage.get('user').then((val) => {
        try {
          $this.userid = val.data.userId;

          rel()
        } catch (err) {
         
          alert("请登录");
        }})
    })

  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }




}
