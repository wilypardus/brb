import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MenusService {
private url = 'https://menu-app-bd.firebaseio.com';
  constructor(
    private http: HttpClient
  ) {  }

      crearMenu(menu){
  return this.http.post(`${this.url}/Menus.json`, menu)
  .pipe(
    map((resp: any) => {
      // console.log("Respuesta Servicio",resp);
      menu.id = resp.name;
      return menu;
    })
  );
  }

  actualizarMenu(menu){
  return this.http.put(`${this.url}/Menus/${menu.id}.json`,menu)

  }
}
