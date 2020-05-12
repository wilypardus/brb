import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  upLoadPercent: Observable<number>;
  urlImage: string;
  constructor(private storage: AngularFireStorage) { }

  onUploadLogo(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.upLoadPercent = task.percentageChanges();
    task.snapshotChanges()
    .pipe(
      finalize(() =>{
    // ref.getDownloadURL().subscribe(resp=>{
    //   this.urlImage=resp
    //   //console.log(this.urlImage)
    // });
    })
    ).subscribe();

  }
  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.upLoadPercent = task.percentageChanges();
    task.snapshotChanges()
    .pipe(
      finalize(() =>{
    ref.getDownloadURL().subscribe(resp=>{
      this.urlImage=resp
      console.log(this.urlImage)
    });
    })
    ).subscribe();
  }
}
