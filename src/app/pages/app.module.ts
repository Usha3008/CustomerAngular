import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { ViewProfileComponent } from './view-profile.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app.routes';
import { EditProfileComponent } from './edit-profile.component';
import { ChangePasswordComponent } from './change-password.component';


//Decorator - NGModule 
@NgModule({
  /*declarations- this section lists all the components and directives used/defined in the 
  application. It is a comma separated list of values. */
  declarations: [
    LoginComponent,
    DashboardComponent,
    ViewProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent
   
  ],
  /*imports - lists all the external modules that are required in this module. */
  imports: [
    BrowserModule, //should be the first module to be imported always, 
    //any other module imports should happen after the BrowserModule import. 
    HttpClientModule,
    RouterModule,
    FormsModule,  //adds the import {FormsModule} from "@angular/forms"
    ReactiveFormsModule,
    //AdminModule,
    AppRoutingModule
  ],
  /* exports - lists all the app modules that will be made available to 
  other external applications - optional */ 
  /* providers - lists all the services and pipes defined within the application
   and these services listed here will be injected by Angular where ever required.
   */
  providers: [],
  /* bootstrap - only the top-most Module in Angular can define this section. 
   No other Module within the application can define it. 
   - Lists the components that should be rendered/loaded when the application starts
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
