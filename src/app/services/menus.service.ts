import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

private menusCollection: AngularFirestoreCollection<any>;
private menuDoc: AngularFirestoreDocument<any>;
public menus:any[]=[];
private url = 'https://menu-app-bd.firebaseio.com';
menuId;
public menuUsr:any[]=[];
// menu;

constructor(
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
   }

   cargarUsrMenu(id){
    this.menusCollection = this.afs.collection<any>('menus', ref => ref.where('uid', '==', id).where('activo','==',true).limit(1));
    return this.menusCollection.valueChanges().pipe(
      map(resp=>{
        return this.menuUsr=resp
        //console.log("Menus filtrado por uid",this.menuUsr);
      })
    )
  }

  // noDisponible(menu,estado){
  //   this.menuDoc=this.afs.doc<any>(`menus/${menu}`)

  // return this.menuDoc.update({'plato': !estado});
  // }
  cargarMenus(){
    this.menusCollection = this.afs.collection<any>('menus');
    return this.menusCollection.valueChanges({ idField: 'eventId' }).pipe(
      map(resp=>{
        //console.log("Menus",resp);
        this.menus=resp
      })
    )
  }

cargarAllMenus(){
  this.menusCollection = this.afs.collection<any>('menus');
  return this.menusCollection.valueChanges({ idField: 'eventId' }).pipe(
    map(resp=>{
      //console.log("Menus",resp);
      this.menus=resp
    })
  )
}

public getMenu(id){
  return this.afs.doc(`menus/${id}`).valueChanges();
}
// Retorna los datos añadiendo el ID a cada elemento
// getMenu(id:string){
//   this.menusCollection = this.afs.collection<any>('menus');

// return this.menusCollection.snapshotChanges().pipe(


//   map(actions => {
//     return actions.map(a => {
//       const data = a.payload.doc.data();
//       data.id = a.payload.doc.id;
//       console.log("data",data);
//       return data;
//     });
//   })
// )



// }

crearMenu(menu){
  this.menusCollection = this.afs.collection<any>('menus');

  return this.menusCollection.add(menu);
}

actualizarMenu(menu,id){
  this.menuDoc=this.afs.doc<any>(`menus/${id}`)
  return this.menuDoc.update(menu);

}
actualizarEstado(id,estado){

  this.menuDoc=this.afs.doc<any>(`menus/${id}`)
  return this.menuDoc.update({activo: !estado});

}
actualizarEstadoPlato(id,m,p,estado){

  this.menuDoc=this.afs.doc<any>(`menus/${id}.categorias[${m}].platos`)
  return this.menuDoc.update({activo: !estado});

}




  ///////////

  //     crearMenu(menu){
  // return this.http.post(`${this.url}/Menus.json`, menu)
  // .pipe(
  //   map((resp: any) => {
  //     // console.log("Respuesta Servicio",resp);
  //     menu.id = resp.name;
  //     return menu;
  //   })
  // );
  // }
  borrarMenu(id){
    this.menuDoc=this.afs.doc<any>(`menus/${id}`);
    this.menuDoc.delete();

    this.menusCollection.doc(id).delete().then((resp)=>{
      console.log("eliminado")

    }).catch(function(error) {
      console.error("Error removing document: ", error);
  })
}

  // actualizarMenu(menu){
  // return this.http.put(`${this.url}/Menus/${menu.id}.json`,menu)

  // }
  // getMenu(id:string){
  //   return this.http.get(`${this.url}/Menus/${id}.json`)

  // }
  getMenus(){
    return this.http.get(`${this.url}/Menus.json`)
    .pipe(
      map(resp=>this.crearArreglo(resp)
    ))
  }

  private crearArreglo(menusObj:object){
    const menus:any[]=[];
    if(menusObj===null){return[];}

    Object.keys(menusObj).forEach(key=>{
      const menu:any = menusObj[key];
      menu.id=key;

      menus.push(menu);
    })
    return menus;
  }
}
