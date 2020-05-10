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
  uid:string;
  menu: any;
  controls;
  idTemp;
  activoTemp;
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

      this.uid=localStorage.getItem('lid');

    this.myForm = this.fb.group({
      id: [''],
      uid:[this.uid],
      name: [''],
      img: [''],
      activo:[false],
      categorias: this.fb.array([])
    });


  }
  get categoriaData() {return  this.myForm.get('categorias') as FormArray; }

ngOnInit():void{
  const id = this.route.snapshot.paramMap.get('id');
  if(id !== 'nuevo'){

    this._menusService.getMenu(id).subscribe((resp:any)=>{
      console.log(resp);
      //console.log("respuesta",resp);

      //const respJSON=JSON.stringify(resp)
      //const respPar=JSON.parse(respJSON);
      //console.log("Resp PARSE",respPar);

      resp.categorias.forEach(x => {
        // console.log("clg xRespPar",x);
        // console.log("clg xRespPar.platos",x.platos);

      const control =  this.myForm.get('categorias') as FormArray;

      control.push(this.fb.group({
        categoria: x.categoria,
        descripcion: x.descripcion,
        platos: this.setPlatos(x) }));

      });

    console.log(resp);
      this.myForm.get('name').setValue(resp.name);

      this.idTemp=id;
      this.myForm.get('id').setValue(this.idTemp);
      this.activoTemp=resp.activo;
    })

  }else{
    this.addNewCategoria()
  }

}

  crearMenu() {
    if (this.idTemp){
      alert("Registro actualizado");
      this._menusService.actualizarMenu(this.myForm.value,this.idTemp).then(resp => {
        console.log(resp);
      });
    }else{
      alert("Registro creado");
      console.log(this.myForm.value);
      this._menusService.crearMenu(this.myForm.value).then(resp => {
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

  actualizarEstado(id,estado){
    this._menusService.actualizarEstado(id,estado).then((resp)=>{
      console.log(resp);
    })
  }
}


