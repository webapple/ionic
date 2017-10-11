import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ArticleDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-details',
  templateUrl: 'article-details.html',
})
export class ArticleDetailsPage {
 lastData:any;
 list:any = [0,2,5,3];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lastData =JSON.parse( navParams.get('data'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDetailsPage');
  }

}
