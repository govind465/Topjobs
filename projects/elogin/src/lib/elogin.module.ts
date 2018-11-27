import { NgModule } from '@angular/core';
import { EloginComponent } from './elogin.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EloginRoutingModule } from './elogin-routing.module';
import { CommonModule } from '@angular/common';
import { EmployeerModule } from 'projects/employeer/src/public_api';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material';


@NgModule({
  declarations: [EloginComponent, SignupComponent, LoginComponent],
  imports: [
    EloginRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule
  ],
  exports: [EloginComponent]
})
export class EloginModule { }
