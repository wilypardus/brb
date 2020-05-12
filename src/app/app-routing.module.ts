import { UploadComponent } from './component/upload/upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenusComponent } from './pages/menus/menus.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { AuthGuard } from './guards/auth.guard';
import { PruebasComponent } from './pruebas/pruebas.component';
import { MenusFirebaseComponent } from './pages/menus-firebase/menus-firebase.component';
import { CustomerMenuComponent } from './pages/customer-menu/customer-menu.component';
import { AdminMenuComponent } from './pages/admin-menu/admin-menu.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';



const routes: Routes = [
{ path: 'template', component: TemplateComponent },
{ path: 'reactivo', component: ReactiveComponent },
{ path: 'upload', component: UploadComponent },
{ path: 'menu/:id', component: MenuComponent, canActivate:[AuthGuard]},
{ path: 'user', component: UserSettingsComponent, canActivate:[AuthGuard]},
// { path: 'menus', component: MenusComponent, canActivate:[AuthGuard]},
{ path: 'admin/:id', component: AdminMenuComponent, canActivate:[AuthGuard]},
{ path: 'menus', component: MenusFirebaseComponent, canActivate:[AuthGuard]},
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'pruebas', component: PruebasComponent},
{ path: 'u/:id', component: CustomerMenuComponent},


{ path: '**', pathMatch: 'full', redirectTo: 'menus' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
