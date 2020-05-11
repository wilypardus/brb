import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from '../models/userLogin.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
usuario:UserLoginModel;
recordarme=false;
  constructor(private _auth:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.usuario=new UserLoginModel();


  }
  onSubmit(form:NgForm){
if (form.invalid){
  return
}
this._auth.nuevoUsuario(this.usuario)
.subscribe(resp=>{
  //console.log(resp);
  if(this.recordarme){
    localStorage.setItem('email',this.usuario.email)
  }
  this.router.navigateByUrl('/menus')
},(err)=>{
  console.log(err.error.error.message);
})
  }

}
