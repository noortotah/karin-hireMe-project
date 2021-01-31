

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })

export class FirebaseService {
  
  public user: any;               // the current user 
  public userDep: any;           // the current user department 
  public admin: any;            // if the user is admin
  public department: any;      // the current department
  public firebaseCID: any;    // the current candidate id
  public firebaseCName: any; // the current candidate
  public JSONstation : any;
  
  constructor(private db: AngularFirestore) { 
    fetch('./assets/data/stations-json.json').then( res => 
      res.json()).then(data => {
        this.JSONstation = data
      })
  }

  //user authentication
  isUser(input){
    return this.db.collection('Users',ref => ref.where('num','==', input.toString() )).get()
  }

  //return array of all the candidate name in the store
  getAllCandidate(){
    const STATION = 5
      let allCandidateName = [];
      var namesArr =  this.db.collection(this.department).doc('Candidate').collection('Data').get().subscribe((snap) =>{
        snap.docs.forEach(doc => {
          allCandidateName.push({
            name: doc.data().name,
            progress: this.calculateProgress(doc.data().progress,STATION)
          })
      })
    })
    return allCandidateName
  }

  //adding new candidate to firebase, no station yet only data
  addNewCandidate(candidate){
  this.db.collection(this.department).doc('Candidate').collection('Data').doc(candidate.id.toString()).set({
      name: candidate.name,
      id: candidate.id,
      job: candidate.job,
      startdate: Date.parse(candidate.startdate),
      lisens: candidate.lisens,
      phone: candidate.phone,
      email: candidate.email,
      progress: 0,
      setingUser: this.user,
      standard: candidate.standard, //מ"מ => 2 תקן =>1 
    })
  }

  getCandidateData(){
    return this.db.collection(this.department).doc('Candidate').collection('Data',ref => ref.where("name","==",this.firebaseCName)).get()
  }

  calculateProgress(progress,num){
    if(progress)
      return Math.round((progress / num ) * 100)
    return  progress  
  }

  addStation(station){
      this.db.collection(this.department).doc('Station').collection(station).doc(this.firebaseCID.toString()).set({
      },{ merge: true })
    }
  
    setStationFile(station,field,val){
      let temp = this.db.collection(this.department).doc('Station').collection(station).doc(this.firebaseCID.toString())
      temp.set({
        [field] : val,
      }, { merge: true })
    }

    getStation(station){
     return this.db.collection(this.department).doc('Station').collection(station).doc(this.firebaseCID.toString()).get()
    }

    deleteCandidate(alertData){
      //save the reason for deleting this candidate
      alertData == 'סיום תהליך' ? this.setDeleteDate(alertData,true) : this.setDeleteDate(alertData,false)
      this.db.collection(this.department).doc('Candidate').collection('Data').doc(this.firebaseCID.toString()).delete() // delete all candidate date
      for( let station of this.JSONstation.stations)
        this.db.collection(this.department).doc('Station').collection(station.name_h).doc(this.firebaseCID.toString()).delete() // delete all candidate stations date
    }

    setDeleteDate(data,good){
      this.db.collection('סגורים').doc(this.firebaseCID.toString()).set({
        id: this.firebaseCID.toString(),
        name: this.firebaseCName,
        department: this.department,
        howDelete: this.user,
        when:  new Date().getTime(),
        cause: data,
        good: good
      })
    }
    
    getClosed(){
      return this.db.collection('סגורים').get()
    }

    deleteClosed(id){
      this.db.collection('סגורים').doc(id).delete()
    }
    setStationProgress(station,num){
      this.db.collection(this.department).doc('Candidate').collection('Data').doc(this.firebaseCID.toString()).set({
        [station] : num
      }, { merge: true })
    }

    setCandidateProgress(num){
      let temp = this.db.collection(this.department).doc('Candidate').collection('Data').doc(this.firebaseCID.toString())
      temp.set({
        progress : num,
      },{ merge: true })
    }
  
}
