import { Component, OnInit } from '@angular/core';
import {  } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UserLoginModel } from '../models/userLogin.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UserLoginModel = new UserLoginModel();
  recordarme=false;
  constructor(private _auth: AuthService,private router:Router) { }

  ngOnInit(): void {
if(localStorage.getItem('email')){
  this.usuario.email=localStorage.getItem('email');
  this.recordarme=true;
}
  }
  login(form: NgForm){
    if (form.invalid){return;}
    this._auth.login(this.usuario).subscribe(
    resp => {
      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email)
      }
  this.router.navigateByUrl('/menus')

      //console.log(resp);

    }, (err) => {
      console.log(err.error.error.message);
    }
  );

    }

}
