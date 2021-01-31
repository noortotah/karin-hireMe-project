import { StationService } from './../station-service/station.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-psifas-test',
  templateUrl: './psifas-test.page.html',
  styleUrls: ['./psifas-test.page.scss'],
})
export class PsifasTestPage implements OnInit {

  public test:any
  public grade: any;
  public userSetTest:string;
  public userSetGrade:string;
  public pass = null; checked = false
  public candidate = null
  public progressCount = 0
  public skills = 0 ; reliability =0 ; integrity = 0
  constructor(public station: StationService) { }

  ngOnInit() {
    this.candidate = this.station.candidate;
    this.station.candidate[this.station.currStationName] ? this.progressCount = this.station.candidate[this.station.currStationName] : this.progressCount = 0
    setTimeout( () =>{
      this.initPsifas()
    },500)
  }

  initPsifas(){
    
    if(this.station.station.test){
      this.test = this.station.station.test.data
      this.userSetTest = this.station.station.test.how
    }
    if(this.station.station.grade){
      this.grade = this.station.station.grade.data
      this.userSetGrade = this.station.station.grade.how
    }
    this.station.station.skills ? this.skills = this.station.station.skills.data : this.skills = 0 
    this.station.station.reliability ? this.reliability = this.station.station.reliability.data : this.reliability = 0 
    this.station.station.integrity ? this.integrity = this.station.station.integrity.data : this.integrity = 0 
    this.station.station.pass ? (this.pass = true,this.checked = true) : null

  }

  savePsifas(data, num){
    num == 1 ? (this.station.setFile('test',data),this.progressCount++): null
    num == 2 ? (this.station.setFile('grade',data),this.progressCount++) : null
    num == 3 ? (this.station.setFile('reliability',data),this.progressCount++) : null
    num == 4 ? (this.station.setFile('integrity',data),this.progressCount++) : null
    num == 5 ? (this.station.setFile('skills',data),this.progressCount++) : null
    if(num == 6) {
      if( this.checked == false){
        this.progressCount++
        this.checked = true
      } 
      this.station.setFile('pass',data)
    } 
    this.station.calculateStationProgress(this.progressCount)
  }
}
