import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

import { BackButtonService } from "../../services/backButton.service";
import { LoginService } from "../../services/login.service"
// import { TabsPage } from "../tabs/tabs";
import { AppOnChangeSunject } from "../../services/user.service";

import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  InterValObj;
  count= 60;
  curCount;
  daojishi: any = '点击获取验证码';
  phone = '';
  pin = '';
  user = {
  }

  @ViewChild('btnDjs')
  btnDjs: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private backButtonService: BackButtonService,
    private renderer: Renderer2,
    private loginService: LoginService,
    private storage: Storage,
  ) {
    // platform.ready().then(() => {
    //   this.backButtonService.registerBackButtonAction(null);
    // });
  }

  sendMessage() {
    this.curCount = this.count;
    this.renderer.setProperty(this.btnDjs.nativeElement, 'disabled', 'true');
    this.daojishi = "请在" + this.curCount + "秒内输入验证码"
    this.InterValObj = setInterval(()=> this.SetRemainTime(), 1000);

    this.loginService.getPin({
      phone: this.phone
    })
    .subscribe((res) => {
      let data = res.json()
      if (data.code == 200) {

      } else {
        var alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: data.message,
          buttons: ['ok']
        });
        alert.present();
      }
    });
  }

  SetRemainTime() {
    if (this.curCount == 0) {
      clearInterval(this.InterValObj);
      this.renderer.removeAttribute(this.btnDjs.nativeElement, 'disabled');
      this.daojishi = '点击获取验证码';
    }
    else {
      this.curCount--;
      this.daojishi = "请在" + this.curCount + "秒内输入验证码"
    }
  }

  logIn() {
    if (this.phone.length == 0) {
        alert("请输入账号");
    } else if (this.pin.length == 0) {
        alert("请输入密码");
    } else {
        let loginInfo = {
          phone: this.phone,
          captcha: this.pin,
          clientType: 'app'
        }

        this.loginService.login(loginInfo)
        .subscribe((res) => {
          let data = res.json()
          if (data.code == 200) {
            console.log(this.storage.get('user'))
            this.user = data
            this.storage.set('user', this.user);
            this.navCtrl.push("TabsPage");
            AppOnChangeSunject.LoginOnChange.next(200);

          } else if (data.code == 400) {
            console.log(data)
          }
        });
    }
  }
}
