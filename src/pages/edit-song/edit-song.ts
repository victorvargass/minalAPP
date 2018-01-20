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
  selector: 'page-edit-song',
  templateUrl: 'edit-song.html',
})
export class EditSongPage {
  public editSongForm: FormGroup;
  public currentSong: any = {};
  public notes: any;
  public categories: any;

  constructor(
	public navCtrl: NavController,
	public navParams: NavParams,
	public formBuilder: FormBuilder,
	public songProvider: SongProvider,
    public toastCtrl: ToastController
  ) {
    this.editSongForm = formBuilder.group({
      title: ['',
      Validators.compose([Validators.required])],
      category: ['',
      Validators.compose([Validators.required])],
      male_note: ['',
      Validators.compose([Validators.required])],
      female_note: ['',
      Validators.compose([Validators.required])],
      lyrics: ['',
      Validators.compose([Validators.minLength(50), Validators.required])]
    });
	this.songProvider
		.getSongDetail(this.navParams.get("songId"))
		.on("value", songSnapshot => {
			this.currentSong = songSnapshot.val();
			this.currentSong.id = songSnapshot.key;
	});
	this.notes = this.songProvider.notes;
	this.categories = this.songProvider.categories;

  }

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditSongPage');
	}

  editSong(songId){
  	songId = this.currentSong.id;
    this.songProvider.editSong(
    	songId,
    	this.editSongForm.value.title, 
      	this.editSongForm.value.category,
      	this.editSongForm.value.male_note,
      	this.editSongForm.value.female_note,
      	this.editSongForm.value.lyrics)
    let toast = this.toastCtrl.create({
      message: 'Canción editada con éxito',
      duration: 3000
    });
    toast.present();
    this.navCtrl.pop();
  }

  goToSongDetail(songId): void {
    this.navCtrl.push('SongDetailPage', { songId: songId });
  }
}