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
  public notes: any;
  public categories: any;

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
    this.categories = [{
          value: "E",
          text: " Exaltación "
        },{
          value: "A",
          text: " Adoración "
        },{
          value: "P",
          text: " Popurrí "
        }]

    this.notes = [{
          value: "C",
          text: " C / Do "
        },{
          value: "C#",
          text: " C# / Do sostenido "
        },{
          value: "D",
          text: " D / Re "
        },{
          value: "D#",
          text: " D# / Re sostenido "
        },{
          value: "E",
          text: " E / Mi "
        },{
          value: "F",
          text: " F / Fa "
        },{
          value: "F#",
          text: " F# / Fa sostenido "
        },{
          value: "G",
          text: " G / Sol "
        },{
          value: "G#",
          text: " G# / Sol sostenido "
        },{
          value: "A",
          text: " A / La "
        },{
          value: "A#",
          text: " A# / La sostenido "
        },{
          value: "B",
          text: " B / Si  "
        }]
        
    this.getSongList().on("value", songListSnapshot => {
      this.songList = [];
      songListSnapshot.forEach( songSnapshot => {
        this.songList.push({                        
          id: songSnapshot.key,
          title: songSnapshot.val().title,
          category: songSnapshot.val().category,
          male_note: songSnapshot.val().male_note,          
          female_note: songSnapshot.val().female_note,
          lyrics: songSnapshot.val().lyrics
        });
        //this.sortSongsByABC(this.songList); //need to optimize this
        return false;
      })
    })
  }

  createSong(
    title: string,
    category: object,
    male_note: string,
    female_note: string,
    lyrics: object
  ): firebase.database.ThenableReference {
    return this.songListRef.push({
      userUid: this.currentUser.uid,
      title: title,
      category: category,
      male_note: male_note,
      female_note: female_note,
      lyrics: lyrics
    });
  }

  editSong(
    id: string,
    title: string,
    category: object,
    male_note: string,
    female_note: string,
    lyrics: object
  ) : Promise<any> {
    let songListRef = firebase.database().ref(`/songs/${id}`)
    return songListRef.update({ title, category, male_note, female_note, lyrics })
  }

  deleteSong(songId: string): PromiseLike<any>  {
    return this.songListRef.child(songId).remove();

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

