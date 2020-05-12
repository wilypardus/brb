import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(
    private afStorage: AngularFireStorage
  ) {
       }
       upload(event) {
        this.afStorage.upload('/upload/to/this-path', event.target.files[0]);
      }

}
