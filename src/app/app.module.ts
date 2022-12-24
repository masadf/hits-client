import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutNavComponent } from './components/logout-nav/logout-nav.component';
import { SimpleButtonComponent } from './components/simple-button/simple-button.component';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { RegistrationComponent } from './pages/registration/registration.component';
import { RouterButtonComponent } from './components/router-button/router-button.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutNavComponent,
    SimpleButtonComponent,
    SimpleInputComponent,
    RegistrationComponent,
    RouterButtonComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
