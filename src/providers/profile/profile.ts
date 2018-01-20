import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;

  constructor(public toastCtrl: ToastController) {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  getUserProfileByUID(userUid: string): firebase.database.Reference {
    return firebase.database().ref(`/userProfile/${userUid}`);
  }

  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userProfile.update({ firstName, lastName });
  }

  updateToken(token: string): Promise<any> {
    return this.userProfile.update({ token });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.
    EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      })
  }

  updatePassword(oldPassword: string, newPassword: string): Promise<any> {
    console.log(oldPassword + newPassword)
    const credential: firebase.auth.AuthCredential = firebase.auth.
    EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          let toast = this.toastCtrl.create({
            message: 'Contraseña cambiada con éxito',
            duration: 3000
          });
          toast.present();
        });
      })
      .catch(error => {
        console.error(error);
      })
  }

}
