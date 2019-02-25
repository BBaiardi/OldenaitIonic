import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from '../auth.service';
import {
  AngularFireStorage
} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageURL: Observable<string>;

  constructor(public auth: AuthService,
    public alertCtrl: AlertController,
    private router: Router,
    private storage: AngularFireStorage) {
  }

  ngOnInit() {}

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `users/${this.auth.afAuth.auth.currentUser.uid}/profile_pic/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe(finalize(() => this.imageURL = ref.getDownloadURL())).subscribe();
  }

  public logout() {
    this.auth.logout();
  }

  async deleteUser() {
    const alert = await this.alertCtrl.create({
      header: 'Confirma borrar usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Aceptar',
          handler: async () => {
            await this.auth.afAuth.auth.currentUser.delete();
            this.router.navigate(['/']);
          }
        }
      ]
    });
    await alert.present();
  }

}
