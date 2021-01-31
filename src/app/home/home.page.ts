import { FirebaseService } from './../firebase-service/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //public departmentIndex: any;
  public departmentArr = ["אדמינסטרציה","קלינאות תקשורת","ריפוי בעיסוק","פיזוטרפיה","רפואה","פסיכולוגיה","עבודה סוציאלית"]
  public user_dep = null
  public admin = false
  constructor(private router: Router, 
              // private firebase:FirebaseService, 
              public nav: NavController) { }

  ngOnInit() {

    // this.user_dep = this.firebase.userDep
    // this.admin = this.firebase.admin 
    
  }
  
 
  //
  moveToDepartmentCandidate(department){
    // this.firebase.department = department
    if(this.user_dep == department  || this.admin )
        this.router.navigate(['candidate-list']);
  }
}
