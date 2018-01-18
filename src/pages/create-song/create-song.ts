import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SongProvider } from '../../providers/song/song';
import { HomePage } from "../../pages/home/home";

/**
 * Generated class for the CreateSongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-song',
  templateUrl: 'create-song.html',
})
export class CreateSongPage {
  public createSongForm: FormGroup;

  constructor(
	  public navCtrl: NavController,
	  public navParams: NavParams,
	  public formBuilder: FormBuilder,
	  public songProvider: SongProvider,
    public toastCtrl: ToastController
  ) {


    this.createSongForm = formBuilder.group({
      title: ['',
      Validators.compose([Validators.required])],
      category: ['',
      Validators.compose([Validators.required])],
      male_note: ['',
      Validators.compose([Validators.required])],
      female_note: ['',
      Validators.compose([Validators.required])],
      lyrics: ['',
      Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateSongPage');
	}

	createSong(){
    this.songProvider.createSong(this.createSongForm.value.title, 
      this.createSongForm.value.category,
      this.createSongForm.value.male_note,
      this.createSongForm.value.female_note,
      this.createSongForm.value.lyrics)
    let toast = this.toastCtrl.create({
      message: 'Canción agregada al repertorio con éxito',
      duration: 3000
    });
    toast.present();
    this.navCtrl.setRoot(HomePage);
	}
}