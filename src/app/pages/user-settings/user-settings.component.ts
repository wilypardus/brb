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

    this.uid=localStorage.getItem('lid');
    this._userService.cargarUser(this.uid).subscribe(
      resp=>{
        this.usuario=resp
        console.log(resp);
      }
    )


    this.usuarioForm=this.fb.group({
      nombre:[''],
      email:[''],
      img:[''],
      adminStatus:[''],
      adminPwd:['']
    });


    //this._userService.cargarUsers().subscribe()
  }

  ngOnInit(): void {
  }
  crearUsrSettings(){}

}
