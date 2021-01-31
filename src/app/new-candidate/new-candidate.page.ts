import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase-service.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-new-candidate',
  templateUrl: './new-candidate.page.html',
  styleUrls: ['./new-candidate.page.scss'],
})
export class NewCandidatePage implements OnInit {

  
    //public newC: object;
    public name: string
    public saturation: string
    public strtProcess: String;
    public id: string
    public job: string
    public standardName: any
    public standard : any;
    public phone: number
    public email: string
    public lisens: string
    public loading;
    
    
  constructor(private firebase: FirebaseService, private router: Router,private alertController: AlertController,public loadingCtrl: LoadingController ) { }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'המועמד נשמר',
      duration: 3000
    });
    return await this.loading.present();
  }
  setR(num){
    console.log('in setR',num)
    this.standard = num
  }
  
  addCandidate(){
    let candidate ={
      name: this.name,
      id: this.id,
      job: this.job,
      lisens: this.lisens,
      startdate: this.strtProcess,
      phone: this.phone,
      email: this.email,
      standard: this.standard,
      standardName: this.standardName,
    }
    console.log(candidate)
    let loader = this.presentLoading().then(() => {
      let ok = this.firebase.addNewCandidate(candidate)
      this.loading.dismiss()
      this.router.navigate(['home']);
    })
  }

  
}
