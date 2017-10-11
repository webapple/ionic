import { Component,ViewChild} from '@angular/core';

import { MyPage } from '../my/my';
import { HomePage } from '../home/home';
import { FoundPage } from '../found/found';
import { GroupPurchasePage } from '../group-purchase/group-purchase';
import {IonicPage, ModalController} from 'ionic-angular';
import { ModalPage } from '../modal/modal';

import { CommentPage } from "../comment/comment";
import {Tabs} from "ionic-angular";

@IonicPage(
  // {
  //   name: 'tabs-page'
  // }
)
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;
  tab1Root = "HomePage";
  tab2Root = "FoundPage";
  tab3Root = "GroupPurchasePage";
  tab4Root = "MyPage";

  constructor(public modalCtrl: ModalController) {

  }
  presentModal(){
    let myModal = this.modalCtrl.create('ModalPage'); //ModalPage
    myModal.present();
  }
}
