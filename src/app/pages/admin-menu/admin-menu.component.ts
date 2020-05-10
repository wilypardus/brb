import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../services/menus.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styles: [
  ]
})
export class AdminMenuComponent implements OnInit {
  id:string;
  menuUsr;

  constructor(public _menusService:MenusService, private route:ActivatedRoute) {
  this.id = this.route.snapshot.paramMap.get('id');
  this._menusService.cargarUsrMenu(this.id).subscribe();
  this._menusService.cargarUsrMenu(this.id).subscribe((resp:any)=>{


    this.menuUsr=resp
    console.log(this.menuUsr);
  });


   }
  ngOnInit(): void {
  }

  noDisponible(m,p,estado){
    // console.log("menu",m);
    // console.log("plato",p);
    const plato=this.menuUsr[0].categorias[m].platos[p]
    plato.activo=!estado;
    // console.log(plato);
    // console.log(this.menuUsr);
    const menuId=this.menuUsr[0].id

    this._menusService.actualizarMenu(this.menuUsr[0],menuId)
    console.log(this.menuUsr);

  }
}
