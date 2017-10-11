import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ArticleService} from "../../services/article";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TakemaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-takemax',
  templateUrl: 'takemax.html',
})
export class TakemaxPage {
  active:string = 'recommend';
  ifshow = true;
  fastdata:any = {
    data:"132132"
  };
  token;
  userid;
  pageSize:number = 20;
  pageNo:number = 1;
  lastData;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app:App,
    private artcleService: ArticleService,
    private storage: Storage,
  ) {
    this.lastData =navParams.get('data');
    console.log(this.lastData)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakemaxPage');
    this.init()
  }
  showchange(){
    this.ifshow = !this.ifshow
  }
  init(){
    let init  = () =>{
      let $this = this;
      $this.storage.get('user').then((val) => {
          try {
            $this.token = val.data.token;
            $this.userid = val.data.userId;
          } catch (err) {
            $this.token = undefined;
            $this.userid = undefined;
          }
          let data = {
            userId:$this.userid,
            type:"2",
            pageNo:$this.pageNo,
            pageSize:$this.pageSize
          }
          $this.artcleService.getTakecommment(data,$this.token).subscribe((res) =>{
            console.log(res);
            $this.fastdata = res.data;
          })
        }
      )};
    init()
  }
}
