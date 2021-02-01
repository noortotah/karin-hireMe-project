import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { PopdataPageModule } from './popover/popdata/popdata.module';
import { HomePage } from './home/home.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';


// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [ ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    // AngularFireDatabaseModule,
    // AngularFireFunctionsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    PopdataPageModule
  ],
  providers: [
    AngularFireModule,
    AngularFirestore,
    StatusBar,
    SplashScreen,
    HomePage,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 