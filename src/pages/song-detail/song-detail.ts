import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SongProvider } from "../../providers/song/song";
import { ProfileProvider } from "../../providers/profile/profile";
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SongDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: "song-detail/:songId"
})
@Component({
  selector: 'page-song-detail',
  templateUrl: 'song-detail.html',
})
export class SongDetailPage {
  public currentSong: any = {};
  public text: string = "";
  public commentList: Array<any>;
  public userId : string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public songProvider: SongProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.songProvider
      .getSongDetail(this.navParams.get("songId"))
      .on("value", songSnapshot => {
        this.currentSong = songSnapshot.val();
        this.currentSong.id = songSnapshot.key;
      });
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
                message: 'Publicación eliminada con éxito',
                duration: 3000
              });
              console.log("Post eliminado desde detail: volver a Home")
              toast.present();
            }
          }
        ]
      });
      confirm.present();
  }



  backToHomePage(songId): void {
    this.navCtrl.push('HomePage');
  }

}
