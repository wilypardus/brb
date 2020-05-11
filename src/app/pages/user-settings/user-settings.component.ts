import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { UserModel } from '../../models/user.model';
import { FormBuilder,FormGroup,FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styles: [
  ]
})
export class UserSettingsComponent implements OnInit {
usuario:UserModel;
uid;

usuarioForm:FormGroup;
  constructor(
    public _userService:UserService,
    private fb: FormBuilder,) {

      this.usuarioForm=this.fb.group({
        nombre:[''],
        email:[''],
        img:[''],
        adminStatus:[''],
        adminPwd:['']
      });

      this.uid=localStorage.getItem('lid');
      this._userService.cargarUser(this.uid).subscribe(
        resp=>{
          this.usuario=resp
          localStorage.setItem('enventId',resp.eventId);
          //Seteo de Datos
          this.usuarioForm.get('nombre').setValue(this.usuario.nombre);
          this.usuarioForm.get('email').setValue(this.usuario.email);
          this.usuarioForm.get('adminStatus').setValue(this.usuario.adminProtected.status);
        }
        )




        //this._userService.cargarUsers().subscribe()
      }

      ngOnInit(): void {

      }

  actualizarUsrSettings(){
    const eventId=localStorage.getItem('eventId')
    this.usuario=this.usuarioForm.value
    console.log(eventId);
    this._userService.cargarUser(this.uid).subscribe(
      resp=>{

        const eventId=resp.eventId
        console.log(eventId);
        this._userService.actualizarUsrSettings(this.usuario,eventId)




      }
      )









  }
}

