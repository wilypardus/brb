import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenusComponent } from './pages/menus/menus.component';


const routes: Routes = [
{ path: 'template', component: TemplateComponent },
{ path: 'reactivo', component: ReactiveComponent },
{ path: 'menu/:id', component: MenuComponent},
{ path: 'menus', component: MenusComponent},


// { path: '**', pathMatch: 'full', redirectTo: 'reactivo' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
