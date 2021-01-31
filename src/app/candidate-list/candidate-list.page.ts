import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase-service.service';
import { StationService } from './../station-service/station.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage implements OnInit {

  public department:any
  public allCandidates: any
  public closeCandidate = [];

  constructor(private firebase: FirebaseService, public router: Router, public station: StationService,
    public alertController: AlertController) { 
    
  }

  ngOnInit() {
    this.allCandidates = this.firebase.getAllCandidate();
    this.firebase.getClosed().subscribe(res => {
      res.docs.forEach(doc => {
        this.closeCandidate.push(doc.data())
      })
    })
    this.department = this.firebase.department;
  }

  goToCandidate(candidate){
    this.firebase.firebaseCName = this.station.candidateName = candidate.name
    this.router.navigate(['candidate']);
  }

  goToNewCandidate(){
    this.router.navigate(['new-candidate']);
  }

  async closedAlert(candidate){
    const alert = await this.alertController.create({
      header: 'המועמד ' + candidate.name,
      subHeader: 'ת.ז ' + candidate.id,
      mode: 'ios',
      message:'סיים את תהליך במכון עקב ' + candidate.cause +
      '<br/> בתאריך ' + new Date(candidate.when).toLocaleDateString('he-IL') +
      '<br/>על ידי ' + candidate.howDelete
    })
    await alert.present()
  }

  async permanentlyDelete(candidate){
    const alert = await this.alertController.create({
      header: 'המועמד ' + candidate.name,
      subHeader: 'ת.ז ' + candidate.id,
      mode: 'ios',
      message: 'ימחק לצמיתות מהמערכת בפעולה זו',
      buttons:[
        {
          text: 'לא',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'כן',
          handler: () => {
           this.firebase.deleteClosed(candidate.id)
           this.router.navigate(['home']);
          }
        }
      ]
    })
    await alert.present()
  }

}
