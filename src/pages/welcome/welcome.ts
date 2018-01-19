import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public keyboard: Keyboard
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.keyboard.disableScroll(true);
  }

  goToLogin() {
    this.navCtrl.push("LoginPage");
  }

  goToSignup() {
    this.navCtrl.push("SignupPage");
  }

}
