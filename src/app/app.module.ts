import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
//import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { MenuComponent } from './pages/menu/menu.component';

import { MenusComponent } from './pages/menus/menus.component';
import { VistaMenuComponent } from './pages/vista-menu/vista-menu.component';
import { LoginComponent } from './auth/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './auth/register.component';
import { HeaderComponent } from './shared/header/header.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { ChatComponent } from './component/chat/chat.component';
import { ChatService } from './services/chat.service';
import { MenusFirebaseComponent } from './pages/menus-firebase/menus-firebase.component';
import { CustomerMenuComponent } from './pages/customer-menu/customer-menu.component';
import { AdminMenuComponent } from './pages/admin-menu/admin-menu.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { UploadComponent } from './component/upload/upload.component';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent,
    MenuComponent,

    MenusComponent,

    VistaMenuComponent,

    LoginComponent,

    RegisterComponent,

    HeaderComponent,

    PruebasComponent,

    ChatComponent,

    MenusFirebaseComponent,

    CustomerMenuComponent,

    AdminMenuComponent,

    UserSettingsComponent,





    UploadComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule

  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
