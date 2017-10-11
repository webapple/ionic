import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BigVPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-big-v',
  templateUrl: 'big-v.html',
})
export class BigVPage {
  lastData
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lastData =navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BigVPage');
  }

}
