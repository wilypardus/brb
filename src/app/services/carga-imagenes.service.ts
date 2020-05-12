import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItemModel } from '../models/file-item.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {
  private CARPETA_IMAGENES='img';
  constructor(private afs:AngularFirestore) { }

cargarImagenesFirebase (imagenes:FileItemModel[]){
const storageRef= firebase.storage().ref();
for (const item of imagenes){
  item.estaSubiendo=true;
  if(item.progreso>=100){
    continue;
  }
  const uploadTask:firebase.storage.UploadTask =

  storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot:firebase.storage.UploadTaskSnapshot)=>item.progreso = (snapshot.bytesTransferred/snapshot.totalBytes)*100,
    (error)=> console.log(error),
    ()=>{
    console.log('Imagen cargada correctamente')
    const url=uploadTask.snapshot.ref.getDownloadURL().then(resp=>{
      item.url=resp;
      console.log(resp);
      item.estaSubiendo=false;
      this.guardarImagen({
        nombre:item.nombreArchivo,
        url:item.url
      });
    })


    }
    )
}
}

  private guardarImagen(imagen:{nombre:string,url:string}){
    this.afs.collection(`/${this.CARPETA_IMAGENES}`)
    .add(imagen)
  }
}
