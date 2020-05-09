import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MenusService } from '../../services/menus.service';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styles: [
  ]
})
export class PlatosComponent {
  controls;
  idTemp;
  data = {
    categorias: [
      {
        categoria: '',
        descripcion: '',
        platos: [
          {
            plato: '',
            descripcion: '',
            precio: '',
          }
        ]
      }
    ]
  };

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _menusService: MenusService
    ) {
    this.myForm = this.fb.group({
      id: [''],
      name: [''],
      categorias: this.fb.array([])
    });

    this.setCategorias();
  }
  get categoriaData() {return  this.myForm.get('categorias') as FormArray; }


  crearMenu() {
    if (this.idTemp){
      alert("Registro actualizado");
      this._menusService.actualizarMenu(this.myForm.value).subscribe(resp => {
        console.log(resp);
      });


    }else{
      alert("Registro creado");
      this._menusService.crearMenu(this.myForm.value).subscribe(resp => {
        this.myForm.get('id').setValue(resp.id);
        this.idTemp=resp.id
        //console.log(resp);
      });

    }

  }

  addNewCategoria() {
    const control = this.myForm.get('categorias') as FormArray;

    control.push(
      this.fb.group({
        categoria: [''],
        descripcion: [''],
        platos: this.fb.array([])
      })
    );
  }

  deleteCategoria(index) {
    const control = this.myForm.get('categorias') as FormArray;
    control.removeAt(index);
  }

  addNewPlato(control) {
    control.push(
      this.fb.group({
        plato: [''],
        descripcion: [''],
        precio: ['']
      }));
  }

  deletePlato(control, index) {
    control.removeAt(index);
  }

  setCategorias() {
    const control =  this.myForm.get('categorias') as FormArray;
    this.data.categorias.forEach(x => {
      control.push(this.fb.group({
        categoria: x.categoria,
        descripcion: x.descripcion,
        platos: this.setPlatos(x) }));
    });
  }

  setPlatos(x) {
    const arr = new FormArray([]);
    x.platos.forEach(y => {
      arr.push(this.fb.group({
        plato: y.plato,
        descripcion: y.descripcion,
        precio: y.precio,
      }));
    });
    return arr;
  }
}


