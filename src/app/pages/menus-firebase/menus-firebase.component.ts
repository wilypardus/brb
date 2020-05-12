import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../services/menus.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menus-firebase',
  templateUrl: './menus-firebase.component.html',
  styles: [
  ]
})
export class MenusFirebaseComponent implements OnInit {
uid:string
  constructor(public _menusService:MenusService,private router:Router) {
    this._menusService.cargarMenus().subscribe();
   }

  ngOnInit(): void {
  }

  borrarMenu(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-info mr-2'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: `¿Seguro que quieres borrar?`,
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._menusService.borrarMenu(id)
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El registro ha sido eliminado',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
       return
      }
    }

    )}

    putMenu(eventId){
      const url= `/menu/${eventId}`;
      this.router.navigateByUrl(url)

    }
    actualizarEstado(id,estado){
      this._menusService.actualizarEstado(id,estado).then((resp)=>{
        //console.log(resp);
      })
    }

}
