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
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
    });
    
    this.songProvider.getSongList().on("value", songListSnapshot => {
      this.songList = [];
      songListSnapshot.forEach( songSnapshot => {
        this.songList.push({                        
          id: songSnapshot.key,
          title: songSnapshot.val().title,
          category: songSnapshot.val().category,
          lyrics: songSnapshot.val().lyrics
        });
        return false;
        //this.sortSongsByABC(this.songList); //need to optimize this
      })
    })
  }

  setFilteredItems() {
    this.songList = this.songProvider.filterItems(this.searchTerm)
    console.log(this.songList)
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
    array.sort(function(a,b){
      return +new Date(b.date) - +new Date(a.date);
    });
  }

  onSearchInput(){
    this.searching = true;
    this.setFilteredItems()
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
