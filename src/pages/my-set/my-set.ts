import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from "../tabs/tabs";
import { AppOnChangeSunject } from "../../services/user.service";
/**
 * Generated class for the MySetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-set',
  templateUrl: 'my-set.html',
})
export class MySetPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySetPage');
  }
  back(){
    let $this = this;
    let confirm = this.alertCtrl.create({
      title:'提示',
      message:'是否退出登录',
      buttons:[
        {
          text:'确定',
          handler:() => {
            $this.storage.clear().then(() =>{
              this.navCtrl.push("TabsPage");

            }).then(() => {
              AppOnChangeSunject.LoginOnChange.next(200);
            })
          }
        },
        {
          text:'取消',
          handler:() => {

          }
        },
      ]
    });
    confirm.present()

  }

}
