import { Component, OnInit } from '@angular/core';
import { StationService } from './../station-service/station.service';



@Component({
  selector: 'app-interview',
  templateUrl: './interview.page.html',
  styleUrls: ['./interview.page.scss'],
})
export class InterviewPage implements OnInit {

  public progressCount = 0;
  public candidateName:string;
  public interviewer:string;
  public date:any ; userSetDate:any;
  public discription:String ; discriptionSetUser: any;
  public interviewerName:any
  public userSetInterviewer = null;userSet = null
  public interviewDate:any
  public message: any
  public discriptionSet = false; saveButton = 'שמור' 
  public job = 0 ; 
  public setreplacedName:any; replacedName:any
  public suitable = 0



  constructor(public station: StationService ) {
    
   }

  ngOnInit() {
    this.candidateName = this.station.candidateName
    this.station.candidate[this.station.currStationName] ? this.progressCount = this.station.candidate[this.station.currStationName] : this.progressCount = 0
    console.log('this.progressCount',this.progressCount);
    setTimeout( () =>{

      this.initInterview()
    },500)
  }

  initInterview(){
    let progress = 0
    if(this.station.station.interviewer){
      this.interviewerName = this.station.station.interviewer.data
      this.userSetInterviewer = this.station.station.interviewer.how;
    }
    if(this.station.station.interviewDate){
      this.date = this.station.station.interviewDate.data
      this.userSetDate = this.station.station.interviewDate.how;  
    }
    if(this.station.station.discription){
      this.discriptionSet = !this.discriptionSet
      this.saveButton = 'ערוך'
      this.discription = this.station.station.discription.data
      this.discriptionSetUser = this.station.station.discription.how;
    }else{
      this.saveButton = 'שמור'
    }
    this.station.station.suitable ? this.suitable = this.station.station.suitable : this.suitable = 0
  }

  setData(data,num){
    num == 1 ? (this.station.setFile('interviewer',data) , this.progressCount++) : null
    num == 2 ? (this.station.setFile('interviewDate',data) , this.progressCount++) : null
    if(num == 3){
      if(this.discriptionSet){
        this.discriptionSet = !this.discriptionSet
        this.saveButton = 'שומר'
      }else if(!this.discriptionSet){
        this.discriptionSet = !this.discriptionSet
        this.saveButton = 'ערוך'
      }
      this.station.setFile('discription',data)
      this.progressCount++
    }
    this.station.calculateStationProgress(this.progressCount)
  }
  setRdiuoForms(rdiuoName,num){
    let d = new Date().getTime()
    this.station.setRdiuo(rdiuoName,num)
    this.suitable == 0 ? this.progressCount++ : null
    this.station.calculateStationProgress(this.progressCount)
  }

}
