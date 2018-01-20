import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;
  public errorMessage: string;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: ['',
      Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
      Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email,
        this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        console.log(error)
        if(error.code == "auth/wrong-password"){
          this.errorMessage = "La contraseña es inválida o el usuario no tiene una contraseña."
        }
        else if (error.code == "auth/user-not-found"){
          this.errorMessage = "No existe un usuario registrado con este correo."
        }
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: this.errorMessage,
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
      this.loading = this.loadingCtrl.create(
        {
          content: "Por favor espera..."
        }
      );
      this.loading.present();
    }
  }

  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }
  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }
}
