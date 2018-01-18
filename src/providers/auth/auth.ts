import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  constructor() {}

  loginUser(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string, 
    firstName: string, lastName: string, type: string): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( newUser => {
      console.log(newUser)
      firebase
        .database()
        .ref('/userProfile')
        .child(newUser.uid)
        .set({ 
          email: email,
          firstName: firstName,
          lastName: lastName,
          type: type
        });
    })
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
