import { Component, CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {App} from "ionic-angular/components/app/app";
import {ArticleIssueTwoPage} from '../article-issue-two/article-issue-two';
import { EditorModule } from 'primeng/primeng';
/**
 * Generated class for the ArticleIssueOnePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-issue-one',
  templateUrl: 'article-issue-one.html',
})
export class ArticleIssueOnePage {
  html:any = "<p>请输入文章正文</p>";
  text1: string = '<div>请输入文章正文</div>';
  text2: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public app:App,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleIssueOnePage');

  }
  show(event){
    this.text2 = event.textValue.length - 1;
    this.html = event.htmlValue;
  }

  next(){
    let $this :any = this;
    $this.storage.set('articlmain', $this.html);
    $this.app.getRootNav().push("ArticleIssueTwoPage");
  }
  config(){
    // console.log(this.text);
  }

}
