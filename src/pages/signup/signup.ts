import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams,
  Loading,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.signupForm = formBuilder.group({
      firstName: ['',
      Validators.compose([Validators.required])],
      lastName: ['',
      Validators.compose([Validators.required])],
      email: ['',
      Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
      Validators.compose([Validators.minLength(6), Validators.required])],
      position: ['',
      Validators.compose([Validators.required])]
    });
  }

  signupUser(){
    if (!this.signupForm.valid){
    } else {
      
      this.authProvider.signupUser(this.signupForm.value.email, 
        this.signupForm.value.password, this.signupForm.value.firstName, this.signupForm.value.lastName, this.signupForm.value.position)
      .then(() => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(HomePage);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create({
        content: "Por favor espera..."
      });
      this.loading.present();
    }
  }
}
