import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController,
  Alert,
  AlertController
} from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";
import { WelcomePage } from '../../pages/welcome/welcome';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider
  ){
  }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
    });
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot(WelcomePage);
    });
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Tu nombre y apellido",
      inputs: [
        {
          name: "firstName",
          placeholder: "Tu nombre",
          value: this.userProfile.firstName
        },
        {
          name: "lastName",
          placeholder: "Tu apellido",
          value: this.userProfile.lastName
        }
      ],
      buttons: [
        { text: "Cancelar" },
        {
          text: "Guardar",
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateEmail():void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [{ name: 'newEmail', placeholder: 'Tu nuevo email' },
        { name: 'password', placeholder: 'Tu contraseña', type: 'password' }],
      buttons: [
        { text: 'Cancelar' },
        { text: 'Guardar',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Tu email ha sido cambiado exitosamente.'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
          }}]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'Nueva contraseña', type: 'password' },
        { name: 'oldPassword', placeholder: 'Contraseña actual', type: 'password' }
      ],
      buttons: [
        { text: 'Cancelar' },
        { text: 'Guardar',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }
}
