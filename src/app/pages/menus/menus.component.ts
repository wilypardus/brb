import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../services/menus.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styles: [
  ]
})
export class MenusComponent implements OnInit {
menus;
  constructor( private _menusService:MenusService) { }

  ngOnInit(): void {

    this._menusService.getMenus().subscribe(resp=>{
      console.log(resp);
      this.menus=resp
    })
  }

}
