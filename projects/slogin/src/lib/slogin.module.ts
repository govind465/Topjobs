import { NgModule } from '@angular/core';
import { SloginComponent } from './slogin.component';
import { LoginComponentSeeker } from './login/login.component';
import { SignupComponentSeeker } from './signup/signup.component';
import { CommonModule } from '@angular/common';


import { SloginRoutingModule } from './slogin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatGridListModule,
  MatCardModule, MatIconModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule,
  MatSelectModule, MatSnackBarModule, MatRadioModule, MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { SeekerModule } from 'projects/seeker/src/public_api';

@NgModule({
  declarations: [SloginComponent, LoginComponentSeeker, SignupComponentSeeker],
  imports: [
    CommonModule,
    SeekerModule,
    SloginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatRadioModule,
    MatTabsModule,
    HttpClientModule,
  ],
  exports: [SloginComponent]
})
export class SloginModule { }
