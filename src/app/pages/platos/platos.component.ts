import { Component, OnInit, PLATFORM_INITIALIZER } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styles: [
  ]
})
export class PlatosComponent {
  controls;
  data = {
    categorias: [
      {
        categoria: "",
        descripcion:"",
        platos: [
          {
            plato: "",
            descripcion:"",
            precio:"",
          }
        ]
      }
    ]
  }

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: [''],
      categorias: this.fb.array([])
    })

    this.setCategorias();
  }
  get categoriaData() {return  this.myForm.get('categorias') as FormArray}
  get platosData() {return  this.myForm.get('platos') as FormArray}

  onSubmit() {
    alert(this.myForm.value);
  }

  addNewCategoria() {
    let control = this.myForm.get('categorias') as FormArray

    control.push(
      this.fb.group({
        categoria: [''],
        descripcion:[''],
        platos: this.fb.array([])
      })
    )
  }

  deleteCategoria(index) {
    let control = this.myForm.get('categorias') as FormArray
    control.removeAt(index)
  }

  addNewPlato(control) {
    control.push(
      this.fb.group({
        plato: [''],
        descripcion:[''],
        precio:['']
      }))
  }

  deletePlato(control, index) {
    control.removeAt(index)
  }

  setCategorias() {
    let control =  this.myForm.get('categorias') as FormArray;
    this.data.categorias.forEach(x => {
      control.push(this.fb.group({
        categoria: x.categoria,
        descripcion: x.descripcion,
        platos: this.setPlatos(x) }))
    })
  }

  setPlatos(x) {
    let arr = new FormArray([])
    x.platos.forEach(y => {
      arr.push(this.fb.group({
        plato: y.plato,
        descripcion: y.descripcion,
        precio: y.precio,
      }))
    })
    return arr;
  }
}


