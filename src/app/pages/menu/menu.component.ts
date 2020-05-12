import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MenusService } from '../../services/menus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {
  upLoadPercent: Observable<number>;
  urlImage: string;
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
    private route:ActivatedRoute,
    private router:Router,
    private storage: AngularFireStorage
    ) {

      this.uid=localStorage.getItem('lid');

    this.myForm = this.fb.group({
      id: [''],
      uid:[this.uid],
      name: [''],
      created:[new Date()],
      modified:[''],
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
        img: x.img,
        platos: this.setPlatos(x) }));

      });

    //console.log(resp);
      this.myForm.get('name').setValue(resp.name);

      this.idTemp=id;
      this.myForm.get('id').setValue(this.idTemp);
      this.activoTemp=resp.activo;
    })

  }else{
    this.crearMenu();
    this.addNewCategoria()
  }

}

  crearMenu() {
    if (this.idTemp){
      this,this.myForm.get('modified').setValue(new Date())
      alert("Registro actualizado");
      this._menusService.actualizarMenu(this.myForm.value,this.idTemp).then(resp => {
        //console.log(resp);
        this.router.navigateByUrl['/menus']

      });
    }else{
     // alert("Registro creado");

      //console.log(this.myForm.value);
      this._menusService.crearMenu(this.myForm.value).then(resp => {
        this.myForm.get('id').setValue(resp.id);
        this.idTemp=resp.id
        this._menusService.actualizarMenu(this.myForm.value,this.idTemp)
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
        img:[''],
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
        precio: [''],
        activo:[true]
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
        activo: y.activo,
      }));
    });
    return arr;
  }

  actualizarEstado(id,estado){
    this._menusService.actualizarEstado(id,estado).then((resp)=>{
      //console.log(resp);
    })
  }

  onUpload(e,i){
  const cartaId=this.myForm.get('id').value;
  console.log(cartaId);



    const file = e.target.files[0];
    const filePath = `upload/${this.uid}/${cartaId}/${i}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.upLoadPercent = task.percentageChanges();
    task.snapshotChanges()
    .pipe(
      finalize(() =>{
    ref.getDownloadURL().subscribe(resp=>{
      this.urlImage=resp
      console.log(this.urlImage);
      (this.myForm.get('categorias') as FormArray).at(i).get('img').setValue(resp);




    });
    })
    ).subscribe();
  }
}


