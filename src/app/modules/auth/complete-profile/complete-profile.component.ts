import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from '../auth.service';
import {
  Router
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  AngularFirestore, AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {

  public completeProfileForm: FormGroup;
  public imageUrl;
  downloadURL;
  uploadPercent;
  dbRef: AngularFirestoreDocument<any>;

  constructor(public auth: AuthService,
    public afs: AngularFirestore,
    public storage: AngularFireStorage,
    private router: Router,
    private fb: FormBuilder) {
    this.createForm();
    this.auth.user$.subscribe(user => {
      if (user) {
        this.dbRef = this.afs.doc(`clubs/${user.uid}`);
      }
    });
  }

  ngOnInit() {}

  createForm() {
    this.completeProfileForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      website: ['', [
        Validators.required
      ]],
      rrpp_name: ['', [
        Validators.required
      ]],
      rrpp_tel: ['', [
        Validators.required
      ]]
    });
  }

  async completeProfile() {
    const data = {
      ...this.completeProfileForm.value,
      imageUrl: this.imageUrl
    };
    return this.dbRef.set(data, {
      merge: true
    }).then(() => {
      this.auth.showToast('!El perfil fue completado exitosamente!', 'success').then(() => {
        this.router.navigate(['/home']);
      });
    }).catch(error => {
      console.log(error);
    });
    /* this.auth.showToast('!El perfil fue completado exitosamente!', 'success');
    return this.router.navigate(['/home']);*/
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `clubs/${this.auth.afAuth.auth.currentUser.uid}/profile_pic/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = ref.getDownloadURL())).subscribe();
      task.then(() => {
        this.downloadURL = ref.getDownloadURL().subscribe(url => {
          this.imageUrl = url;
        });
      });
  }

}
