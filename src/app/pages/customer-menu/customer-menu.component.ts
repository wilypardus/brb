import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../services/menus.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-customer-menu',
  templateUrl: './customer-menu.component.html',
  styles: [
  ]
})
export class CustomerMenuComponent implements OnInit {
  id:string;
  menuUsr;

  constructor(public _menusService:MenusService, private route:ActivatedRoute) {
  this.id = this.route.snapshot.paramMap.get('id');
  this._menusService.cargarUsrMenu(this.id).subscribe();

   }

  ngOnInit(): void {
  }


}
