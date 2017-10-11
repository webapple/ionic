import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA  } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import  { CommonModule} from '@angular/common';


import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { EditorModule } from 'primeng/primeng';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { MyPage } from '../pages/my/my';


import { BackButtonService } from '../services/backButton.service';
import { LoginService } from "../services/login.service"
import { UserService } from "../services/user.service";
import { ArticleService} from "../services/article";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回',
      iconMode: 'ios',//安卓icon强制使用ios的icon以及样式
      mode: 'ios',//样式强制使用ios样式
    }),

  ],
  bootstrap: [IonicApp],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  entryComponents: [
    MyApp,
  ],
  providers: [
    BackButtonService,
    LoginService,
    UserService,
    ArticleService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
