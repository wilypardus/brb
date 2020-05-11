import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginModel } from '../models/userLogin.model';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url='https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey='AIzaSyCdG2JvQyyWg8vYQmqB2jjlgttQxqNo7Pk';
  userToken:string;
  usuarioSttTemp:UserModel={
    eventId:'',
  uid:'',
  nombre:'',
  email:'',
  img:'',
  created:new Date(),
  activo:false,
  adminProtected:{
    status:false,
    pwd:''
  }}

//Crear nuevo usuario
//  https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//Login
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]



  constructor(private http:HttpClient,public _userService:UserService) {
    this.leerToken();
   }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario:UserLoginModel){
    const authData={
      ...usuario,
      returnSecureToken:true,
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,authData
    ).pipe(
      map( resp=>{
        this.guardarToken(resp['idToken']);
        const uid=resp['localId']
        //console.log("uid",uid);
        localStorage.setItem('lid',uid)
        return resp;
      } )
    )
  }

  nuevoUsuario(usuario:UserLoginModel){
    console.log(usuario.email);
    console.log("UsuarioStt",this.usuarioSttTemp);
    this.usuarioSttTemp.nombre=usuario.nombre;
    this.usuarioSttTemp.adminProtected.status=false;

    this.usuarioSttTemp.email=usuario.email;
    const authData={
      ...usuario,
      returnSecureToken:true,
    };
    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,authData
    ).pipe(
      map( resp=>{
        this.guardarToken(resp['idToken']);
        //Crear prefil usuario en colleción users
        this.usuarioSttTemp.uid=resp['localId']
        console.log("respuesta Login",resp);
        this._userService.crearUsrSettings(this.usuarioSttTemp);
        return resp;
      } )
    )

  }
  guardarToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem('token',idToken);

    let hoy = new Date();
      hoy.setSeconds(3600);

      localStorage.setItem('expira',hoy.getTime().toString());

  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }
  estaAutenticado():boolean{
    if (this.userToken.length<2){
      return false;
    }

    const expira=Number(localStorage.getItem('expira'));
    const expiraDate=new Date();
    expiraDate.setTime(expira);
    if(expiraDate>new Date()){
      return true
    }else{
      return false
    }
  }
}
