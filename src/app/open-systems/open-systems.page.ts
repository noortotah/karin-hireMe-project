import { StationService } from './../station-service/station.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-open-systems',
  templateUrl: './open-systems.page.html',
  styleUrls: ['./open-systems.page.scss'],
})
export class OpenSystemsPage implements OnInit {

  
  public radioArr = [ false,false,false,false,false,false,false,
                      false,false,false,false,false,false,false ]

 public progressCount = 0
  constructor(public station:StationService) { }

  ngOnInit() {
    this.station.candidate[this.station.currStationName] ? this.progressCount = this.station.candidate[this.station.currStationName] : this.progressCount = 0
    setTimeout(() => {
      this.initSystem()
    }, 500);
  }


  
  initSystem(){
    const NUM_OF_FORMS = 14
    let num = 0 , progress = 0
    let process = 'sf_' + (num + 1).toString()
    let user = null
  

    while(num < NUM_OF_FORMS ){
      process = 'sf_' + (num + 1).toString()
      user = 'setSf_' +  (num + 1).toString()
      if(this.station.station[process]){
        this.radioArr[num]  = true
        this.progressCount++
      }
      num++
    }
    this.station.calculateStationProgress(this.progressCount)
  }

  setRdiuoForms(rdiuoName){
    let d = new Date().getTime()
    this.station.setRdiuo(rdiuoName,d)
    this.progressCount++
    this.station.calculateStationProgress(this.progressCount)
  }

}
