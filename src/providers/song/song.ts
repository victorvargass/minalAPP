import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SongProvider {
  public songListRef: firebase.database.Reference;
  public songRef:firebase.database.Reference;
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;
  public songList: Array<any>;
  constructor() {
    this.songListRef = firebase
      .database()
      .ref(`/songs`)
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);

      }
    });
    this.getSongList().on("value", songListSnapshot => {
      this.songList = [];
      songListSnapshot.forEach( songSnapshot => {
        this.songList.push({                        
          id: songSnapshot.key,
          title: songSnapshot.val().title,
          type: songSnapshot.val().type,
          lyrics: songSnapshot.val().lyrics
        });
        //this.sortSongsByABC(this.songList); //need to optimize this
        return false;
      })
    })
  }

  createSong(
    lyrics: string,
    title: string,
    type: object,
    category: object
  ): firebase.database.ThenableReference {
    return this.songListRef.push({
      userUid: this.currentUser.uid,
      title: title,
      type: type,
      category: category,
      lyrics: lyrics
    });
  }

  deleteSong(songId: string): PromiseLike<any>  {
    return this.songListRef.child(songId).remove();

  }

  updateLyrics(lyrics: string): Promise<any> {
    return this.userProfile.update({ lyrics });
  }

  getSongList(): firebase.database.Reference {
    return this.songListRef;
  }

  getSongDetail(songId: string): firebase.database.Reference {
    return this.songListRef.child(songId);
  }

  filterItems(searchTerm){
      return this.songList.filter((item) => {
          return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });    
  }

}

