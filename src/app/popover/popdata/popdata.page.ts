import { NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-popdata',
  templateUrl: './popdata.page.html',
  styleUrls: ['./popdata.page.scss'],
})
export class PopdataPage implements OnInit {

  public candidatData = null ;
  public date = null
  public standard = null
  constructor(private NavParams: NavParams) { }

  ngOnInit() {
    this.candidatData = this.NavParams.get('candidate')
    this.date = new Date( this.candidatData.startdate).toLocaleDateString('he-IL') //convert the start date from long to date string
    this.candidatData.standard == 1 ? this.standard = 'תקן' : this.standard = 'מ"מ'
  }

}
