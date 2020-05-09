import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  estaAutenticado=false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  constructor(public _authService:AuthService, private router:Router) {
    this.estaAutenticado=this._authService.estaAutenticado();

  }

  ngOnInit(): void {
    this.estaAutenticado=this._authService.estaAutenticado();

  }
  ngOnChanges(): void {


  }
  logout(){
    this._authService.logout()
    this.estaAutenticado=false
    this.router.navigateByUrl('/login')

  }

}
