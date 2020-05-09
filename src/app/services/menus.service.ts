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
  getMenu(id:string){
    return this.http.get(`${this.url}/Menus/${id}.json`)

  }
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
