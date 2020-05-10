import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styles: [
  ]
})
export class PruebasComponent implements OnInit {
  users: Observable<any[]>;
  constructor(firestore: AngularFirestore,public auth: AngularFireAuth) {
    this.users = firestore.collection('users').valueChanges();

   }

  ngOnInit(): void {
  }

}
