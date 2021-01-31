import { PopdataPage } from '../popover/popdata/popdata.page';
import { StationService } from './../station-service/station.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase-service.service';
import { HomePage } from '../home/home.page';
import { Router } from '@angular/router';
import { LoadingController, AlertController,PopoverController  } from '@ionic/angular';



@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.page.html',
  styleUrls: ['./candidate.page.scss'],
})
export class CandidatePage implements OnInit {

  public candidateStationList = [ {name: "ראיון אישי", progress: 0, stationNum: 4, finish: false},
                                   {name: "מבחן פסיפס" ,progress: 0,stationNum: 6, finish: false},
                                   {name:"הצעת שכר", progress: 0,stationNum: 9, finish: false } ,
                                   {name:"חובקן טפסים",progress: 0,stationNum: 17, finish: false},
                                   {name:"פתיחת מועמד במערכת",progress: 0,stationNum: 14,finish: false}
                                  ];
  public currCandidate = null;
  public tempDate;
  public finisStation = false
  public stationList = []
  

  constructor(private firebase: FirebaseService,public home: HomePage, 
              public router:Router,public station:StationService,public loadingCtrl: LoadingController, 
              public alertController: AlertController,private pop:PopoverController ) { 
              
  }
  

  ngOnInit() {
    this.stationList = this.firebase.JSONstation.stations
    this.firebase.getCandidateData().subscribe((doc) => {
      this.initCandidateDate(doc)
    })
  }

initCandidateDate(obs){
    let countTemp = 0
    obs.docs.forEach(ref =>{
        this.currCandidate = ref.data() // all candidate date
        this.firebase.firebaseCID = ref.data().id // set the candidate id in firebaseService
        this.tempDate = new Date(ref.data().startdate).toLocaleDateString('he-IL') //convert the start date from long to date string
        this.station.candidate = ref.data() //to initialize the candidate in the station service
        this.candidateStationList.forEach( (sta,i) => { //all the station object
          if(ref.data()[this.candidateStationList[i].name]) // if we started this station calculate this progress else stay 0
            sta.progress = this.firebase.calculateProgress(ref.data()[this.candidateStationList[i].name],sta.stationNum)
          if(sta.progress >= 100) { // the candidate finish the station
            sta.finish = true
            countTemp++
          }
        })
        if(countTemp == 5){ // all stations finished
          this.finishAlert()

        }else
          this.firebase.setCandidateProgress(countTemp)
      })
  
  }

 
  async finishAlert(){
    const alert = await this.alertController.create({
      header: ' המועמד' + this.currCandidate.name,
      mode: 'ios',
      message: 'סיים את תהליך הקבלה לעבודה <br/> כל המידע עליו ימחק לצמיתות מהאפליקציה'
    });
    await alert.present()
    this.firebase.deleteCandidate('סיום תהליך')
    setTimeout(() => {
      alert.dismiss()
    }, 3000);
    
  }



  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'האם להסיר מועמד זה?',
      message: 'בהסרת מועמד זה כל הנתונים שנשמרו עד רגע זה ימחקו לצמיתות',
      mode: 'ios',
      buttons: [
        {
          text: 'לא',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'כן',
          handler: () => {
            this.presentAlertInput()
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertInput() {
    const alert = await this.alertController.create({
      header: 'אנא כתוב את סיבת סגירת המועמד',
      mode: 'ios',
      inputs: [
        {
          name: 'cause',
          type: 'text',
        },
      ],
      buttons: [
        {
          text: 'שמור',
          role: 'save',
          cssClass: 'secondary',
          handler: (data) => {
            this.firebase.deleteCandidate(data.cause)
            this.router.navigate(['home']);
          }
        }
      ]
    });

    await alert.present();
  }

  stationRouting(index,station){
    this.station.getStationData(station)
    this.router.navigate([this.stationList[index].name_e]);
  }

  async presentPopover(ev: Event) {
    const popover = await this.pop.create({
      component: PopdataPage,
      componentProps: {
        candidate: this.currCandidate
      },
      event: ev,
      translucent: true,
    });
   
    return await popover.present();
  }

}













