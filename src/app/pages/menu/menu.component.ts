import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MenusService } from '../../services/menus.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {
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
    private _menusService: MenusService,
    private route:ActivatedRoute
    ) {
    this.myForm = this.fb.group({
      id: [''],
      name: [''],
      img: [''],
      categorias: this.fb.array([])
    });


  }
  get categoriaData() {return  this.myForm.get('categorias') as FormArray; }

ngOnInit():void{
  const id = this.route.snapshot.paramMap.get('id');
  if(id !== 'nuevo'){
    this._menusService.getMenu(id)
    .subscribe(resp=>{
      //console.log("respuesta",resp);

      const respJSON=JSON.stringify(resp)
      const respPar=JSON.parse(respJSON);
      //console.log("Resp PARSE",respPar);

      respPar.categorias.forEach(x => {
        // console.log("clg xRespPar",x);
        // console.log("clg xRespPar.platos",x.platos);



      const control =  this.myForm.get('categorias') as FormArray;

      control.push(this.fb.group({
        categoria: x.categoria,
        descripcion: x.descripcion,
        platos: this.setPlatos(x) }));



      });


      this.myForm.get('name').setValue(respPar.name);






      this.idTemp=id;
      this.myForm.get('id').setValue(this.idTemp);
    })
  }else{
    this.addNewCategoria()
  }

}

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


