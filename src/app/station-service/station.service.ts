
import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase-service.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  public currUser: any;
  public candidateName: any;
  public currStationName: any;
  public station: any;
  public candidate = null

  constructor(public nav: NavController,private firebase: FirebaseService) {
    this.candidateName = this.firebase.firebaseCName
    console.log(this.candidateName)
   }

   getStationData(stationName){
   this.currStationName = stationName
    let temp = this.firebase.getStation(stationName).subscribe((data) => {
      if(data)
        this.firebase.addStation(stationName)
        this.station = data.data()
    })
    return this.station
   }

   setFile(fieldName,date){
     let obj = {data: date , how: this.firebase.user}
     this.firebase.setStationFile(this.currStationName,fieldName,obj)
   }

   navFunction(num){
    if(num == 1)
      this.nav.back();
    if(num == 2)
      this.nav.navigateForward('/home')
  }

  // createHader(){
  //   var temp = document.createElement("temp");
  //   var list = document.getElementById("header");
  //     temp.innerHTML = "<ion-toolbar mode='ios'> \
  //                         <ion-title> \
  //                           <ion-row> \
  //                             <ion-col>\
  //                               <ion-icon name='home' float-right (click)='station.navFunction(2)'></ion-icon> \
  //                             </ion-col> \
  //                             <ion-col> \
  //                               <ion-icon float-right name='arrow-round-forward' (click)='station.navFunction(1)'></ion-icon> \
  //                             </ion-col> \
  //                           </ion-row> \
  //                         </ion-title> \
  //                         </ion-toolbar>"
  //         list.appendChild(temp);
  // }

  setRdiuo(rdiuoName,data){
    this.firebase.setStationFile(this.currStationName,rdiuoName,data)
  }

  calculateStationProgress(num){
    this.firebase.setStationProgress(this.currStationName,num)
  }
  
}
