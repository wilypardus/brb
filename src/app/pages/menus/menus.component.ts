import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../services/menus.service';
import Swal from 'sweetalert2'

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

  //   this._menusService.getMenus().subscribe(resp=>{
  //     //console.log(resp);
  //     this.menus=resp
  //   })
  // }
  // borrarMenu(menu,i:number){
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-danger',
  //       cancelButton: 'btn btn-outline-info mr-2'
  //     },
  //     buttonsStyling: false
  //   })

  //   swalWithBootstrapButtons.fire({
  //     title: `¿Seguro que quieres borrar ${menu.name}?`,
  //     text: "Esta acción no se puede revertir",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Eliminar',
  //     cancelButtonText: 'Cancelar',
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.value) {
  //       this._menusService.borrarMenu(menu.id)
  //       swalWithBootstrapButtons.fire(
  //         'Eliminado!',
  //         'El registro ha sido eliminado',
  //         'success'
  //       )
  //     } else if (
  //       /* Read more about handling dismissals below */
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //      return
  //     }

  // }

  //   )
  }
}
