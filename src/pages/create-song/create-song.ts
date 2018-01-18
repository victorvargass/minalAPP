import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
	  public songProvider: SongProvider
  ) {


    this.createSongForm = formBuilder.group({
      title: ['',
      Validators.compose([Validators.required])],
      type: ['',
      Validators.compose([Validators.minLength(6), Validators.required])],
      category: ['',
      Validators.compose([Validators.required])],
      lyrics: ['',
      Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateSongPage');
	}

	createSong(){
    this.songProvider.createSong(this.createSongForm.value.lyrics,
    this.createSongForm.value.title, this.createSongForm.value.type, this.createSongForm.value.category)
    this.navCtrl.setRoot(HomePage);
	}
}