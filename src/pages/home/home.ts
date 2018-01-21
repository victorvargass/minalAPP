import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SongProvider } from "../../providers/song/song";
import { ProfileProvider } from "../../providers/profile/profile";
import { AlertController } from 'ionic-angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public songList: Array<any>;
  searchTerm: string = '';
  public searchControl: FormControl;
  searching: any = false; 
  private isOn: boolean = false;
  public userProfile: any;
  public exaltacionList: Array<any>;
  public adoracionList: Array<any>;
  public popurriList: Array<any>;
  public exaltacionListCount: number;
  public adoracionListCount: number;
  public popurriListCount: number;
  public songsSegment;
  constructor(
  	public navCtrl: NavController,
    public navParams: NavParams,
    public songProvider: SongProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public profileProvider: ProfileProvider
    ) {

  }

  ionViewDidLoad(){
    this.songsSegment = 'Exaltación';
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      let image = document.getElementsByClassName("background");
      image[0].setAttribute("style", "height: 200px; background:no-repeat center/100% url('assets/imgs/"+this.userProfile.position+".jpg'); background-size: cover; ");


    });
    
    this.songProvider.getSongList().on("value", songListSnapshot => {
      this.exaltacionList = [];
      this.adoracionList = [];
      this.popurriList = [];
      songListSnapshot.forEach( songSnapshot => {
        if (songSnapshot.val().category == "Exaltación") {
          this.exaltacionList.push({                        
            id: songSnapshot.key,
            title: songSnapshot.val().title,
            category: songSnapshot.val().category,
            lyrics: songSnapshot.val().lyrics
          });
        }
        else if (songSnapshot.val().category == "Adoración") {
          this.adoracionList.push({                        
            id: songSnapshot.key,
            title: songSnapshot.val().title,
            category: songSnapshot.val().category,
            lyrics: songSnapshot.val().lyrics
          });
        }
        else {
          this.popurriList.push({                        
            id: songSnapshot.key,
            title: songSnapshot.val().title,
            category: songSnapshot.val().category,
            lyrics: songSnapshot.val().lyrics
          });
        }
        this.exaltacionListCount = this.exaltacionList.length;
        this.adoracionListCount = this.adoracionList.length;
        this.popurriListCount = this.popurriList.length;

        this.sortSongsByABC(this.exaltacionList); //need to optimize this
        this.sortSongsByABC(this.adoracionList); //need to optimize this
        this.sortSongsByABC(this.popurriList); //need to optimize this
        return false;
      })
    })
  }

  setFilteredItems(segment) {
    let filterList = this.songProvider.filterItems(this.searchTerm, segment)
    switch(segment) {
        case 'Exaltación':
            this.exaltacionList = filterList;
            this.sortSongsByABC(this.exaltacionList); //need to optimize this

            break;
        case 'Adoración':
            this.adoracionList = filterList;
            this.sortSongsByABC(this.adoracionList); //need to optimize this

            break;
        case 'Popurrí':
            this.popurriList = filterList;
            this.sortSongsByABC(this.popurriList); //need to optimize this

    }
  }

  goToProfile(): void {
    this.navCtrl.push("ProfilePage");
  }

  goToSongDetail(songId): void {
    this.navCtrl.push('SongDetailPage', { songId: songId });
  }
  
  goToCreateSong(): void {
    this.navCtrl.push('CreateSongPage');
  }

  deleteSong(songId): void {
    console.log(songId)
      let confirm = this.alertCtrl.create({
        title: 'Eliminar',
        message: '¿Desea eliminar su publicación?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {

            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.songProvider.deleteSong(songId)
              let toast = this.toastCtrl.create({
                message: 'Canción eliminada con éxito',
                duration: 3000
              });
              toast.present();
            }
          }
        ]
      });
      confirm.present();
  }

  sortSongsByABC(array): void {
    array.sort(function (a, b) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  onSearchInput(){
    this.searching = true;
    this.setFilteredItems(this.songsSegment)
  }


  getButtonText(): string {
    return `Switch ${ this.isOn ? 'Off' : 'On' }`;
  }
  setState(): void {
    this.isOn = !this.isOn;
  }

  toggleDetails() {
    this.isOn = !this.isOn;
  }

}
