import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid:string;
  eventId:string;
  private url = 'https://menu-app-bd.firebaseio.com';
  private usersCollection: AngularFirestoreCollection<any>;
  private userDoc: AngularFirestoreDocument<any>;
 public usuario:UserModel;
 public usuarios:any []=[];
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
this.uid=localStorage.getItem('lid');
this.cargarUser(this.uid);

// console.log(this.usuarios);

  }

  cargarUser(uid){
    this.usersCollection = this.afs.collection<any>('users', ref => ref.where('uid', '==', uid).limit(1));
    return this.usersCollection.valueChanges({ idField: 'eventId' }).pipe(
      map(resp=>{
        //console.log("usuario filtrado por uid",resp);
       return this.usuario=resp[0]
      })
    )
  }

  crearUsrSettings(usuario:UserModel){
    this.usersCollection = this.afs.collection<any>('users');

    return this.usersCollection.add(usuario);
  }

  actualizarUsrSettings(usuario,uid){
    this.userDoc=this.afs.doc<any>(`users/${uid}`)
    return this.userDoc.update(usuario);

  }

  cargarUsers(){
    this.usersCollection = this.afs.collection<any>('users');
    return this.usersCollection.valueChanges({ idField: 'eventId' }).pipe(
      map(resp=>{
        // console.log("Users",resp);
        this.usuarios=resp
      })
    )
  }
}
