import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
    ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#D32F2F');
      this.splashScreen.hide();
    });
    // used for an example of ngFor and navigation

    firebase.initializeApp({
      apiKey: "AIzaSyBeMEsh16_QWe1a42c-eN3JVvFdLVgXDsk",
      authDomain: "minalapp-7c12e.firebaseapp.com",
      databaseURL: "https://minalapp-7c12e.firebaseio.com",
      projectId: "minalapp-7c12e",
      storageBucket: "minalapp-7c12e.appspot.com",
      messagingSenderId: "807421164203"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = WelcomePage;
        unsubscribe();
      } else {
        this.rootPage = HomePage;
        unsubscribe();
      }
    });

  }

}
