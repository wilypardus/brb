import { Component, OnInit } from '@angular/core';
import { FileItemModel } from '../../models/file-item.model';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {
archivos:FileItemModel[]=[];
estaSobreElemento=false;

  constructor(public _cargaImagenesService:CargaImagenesService) { }

  ngOnInit(): void {
  }

  cargarImagenes(){
    this._cargaImagenesService.cargarImagenesFirebase(this.archivos);

  }
}
