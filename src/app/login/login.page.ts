import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loading: any;
  public input = null

  constructor(private router: Router,public loadingCtrl: LoadingController, public alertController: AlertController,public firebase: FirebaseService){}
  
  ngOnInit() {}
  
  //loading icon
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      duration: 2000
    });
    return await this.loading.present();
  }

  //wrong password alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: ' סיסמה שגויה, אנא נסה שנית    ',
      mode: 'ios',
      buttons: ['הבנתי']
    });
    alert.present();
  }
  
  //empty input alert
  async presentEmptyFiledAlert() {
    const alert = await this.alertController.create({
      header: 'אנא מלא את השדות הנדרשים',
      mode: 'ios',
      buttons: ['הבנתי']
    });

    await alert.present();
  }

  //user authentication function
  submitLogin(){
    const numOfChars = 10;
    let loader = this.presentLoading().then(() => {
      if(!this.input || this.input.length > numOfChars){
        this.loading.dismiss()
        this.presentEmptyFiledAlert()
      }else{
        this.firebase.isUser(this.input).subscribe((snap) =>{
          if(!snap.empty){
            snap.docs.forEach((doc) => {
              this.firebase.user = doc.data().name;
              doc.data().admin ? this.firebase.admin = doc.data().admin : this.firebase.userDep = doc.data().department
            })
            this.loading.dismiss()
            this.router.navigate(['home'])
          }
          else{
            this.loading.dismiss()
            this.presentAlert()
          }
        })
      }
    });
  }
}
