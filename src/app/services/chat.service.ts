import { Mensaje } from './../interface/mensaje.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public chats:Mensaje[]=[];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats',ref=>ref.orderBy('fecha','desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map(mensajes=>{
        console.log("mensajes",mensajes);
        this.chats=mensajes
      })
    )
 }

 agregarMensaje(texto:string){
   let mensaje:Mensaje={
     nombre:'Will',
     mensaje: texto,
     fecha:new Date().getTime()
   }
   return this.itemsCollection.add(mensaje);
 }
}
