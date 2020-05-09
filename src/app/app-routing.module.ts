import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenusComponent } from './pages/menus/menus.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
{ path: 'template', component: TemplateComponent },
{ path: 'reactivo', component: ReactiveComponent },
{ path: 'menu/:id', component: MenuComponent, canActivate:[AuthGuard]},
{ path: 'menus', component: MenusComponent, canActivate:[AuthGuard]},
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},


{ path: '**', pathMatch: 'full', redirectTo: 'menus' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
