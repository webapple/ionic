// import { Component } from '@angular/core';
// import { Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, Nav ,IonicApp} from 'ionic-angular';
import { StatusBar,} from '@ionic-native/status-bar';
import { TabsPage } from '../pages/tabs/tabs';
import {SplashScreen} from "@ionic-native/splash-screen";
import {App} from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'TabsPage';
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('mycontent') nav: Nav;
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public toastCtrl: ToastController,
              public ionicApp: IonicApp,
              public app :App

  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initializeApp();//注册返回按键事件
    });

  }
  initializeApp() {
    this.platform.ready().then(() => {
      //注册返回按键事件
      this.platform.registerBackButtonAction((): any => {
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        if (!(page instanceof TabsPage)) {
          if (!this.nav.canGoBack()) {
            //当前页面为tabs，退出APP
            return this.showExit();
          }
          //当前页面为tabs的子页面，正常返回
          return this.nav.pop();
        }
        let tabs = page.tabs;
        let activeNav = tabs.getSelected();
        if (!activeNav.canGoBack()) {
          //当前页面为tab栏，退出APP
          return this.showExit();
        }
        //当前页面为tab栏的子页面，正常返回
        return activeNav.pop();
      }, 101);
    });
  }


  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

}
