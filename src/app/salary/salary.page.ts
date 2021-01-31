import { StationService } from './../station-service/station.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-salary',
  templateUrl: './salary.page.html',
  styleUrls: ['./salary.page.scss'],
})
export class SalaryPage implements OnInit {

  public hrSendDate:any
  public hrReturnDate: any
  public userHrReturn: any
  public userHrSend
  public setCertificate = false; setCv = false; setSeniority = false; setArmy = false
  public name: any
  public candidateSendDate: any
  public userCanddiateSend: any
  public candidateReturnDate: any
  public userCanddiateReturn: any
  public candidateName: any
  public answer = false
  public progressCount = 0

  constructor(public station:StationService) { }

  ngOnInit() {

    this.candidateName = this.station.candidateName
    this.station.candidate[this.station.currStationName] ? this.progressCount = this.station.candidate[this.station.currStationName] : this.progressCount = 0
    setTimeout( () =>{
      this.initSalary()
    },500)
  }


  initSalary(){
    let corrStation = this.station.station;
    if(corrStation.hrSendDate){
      this.hrSendDate = corrStation.hrSendDate.data
      this.userHrSend = corrStation.hrSendDate.how
    }
    if(this.station.station.hrReturnDate){
      this.hrReturnDate = corrStation.hrReturnDate.data
      this.userHrReturn = corrStation.hrReturnDate.how
    }
    if(this.station.station.hrReturnDate){
      this.candidateSendDate = corrStation.candidateSendDate.data
      this.userCanddiateSend = corrStation.candidateSendDate.how
    }
    if(this.station.station.hrReturnDate){
      this.candidateReturnDate = corrStation.candidateReturnDate.data
      this.userCanddiateReturn = corrStation.candidateReturnDate.how
    }
    //radio button 
    corrStation.certificate ? (this.setCertificate = true ): this.setCertificate = false
    corrStation.cv ? (this.setCv = true  ) : this.setCv = false
    corrStation.seniority ? (this.setSeniority = true) : this.setSeniority = false
    corrStation.army ? (this.setArmy = true  ): this.setArmy = false
    corrStation.answer ? (this.answer = true ): this.answer = false
  }

  saveSalary(data, num){
    num == 1 ? (this.station.setFile('hrSendDate',data),this.progressCount++) : null
    num == 2 ? (this.station.setFile('hrReturnDate',data),this.progressCount++) : null
    num == 3 ? (this.station.setFile('candidateSendDate',data),this.progressCount++) : null
    num == 4 ? (this.station.setFile('candidateReturnDate',data),this.progressCount++) : null
    num == 5 ? (this.station.setFile('answer',true),this.progressCount++) : null
    this.station.calculateStationProgress(this.progressCount)
  }

  setRdiuoForms(rdiuoName){
    let d = new Date().getTime()
    this.station.setRdiuo(rdiuoName,d)
    this.progressCount++
    this.station.calculateStationProgress(this.progressCount)
  }
}
