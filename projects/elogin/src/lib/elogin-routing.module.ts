import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EloginComponent } from './elogin.component';



const routes: Routes = [
  {
    path: 'elogin', component: EloginComponent, children: [
      {
        path: '', component: SignupComponent
      },
      {
        path: 'login', component: SignupComponent
      },
      {
        path: 'signup', component: LoginComponent

      },

      {
        path: '', redirectTo: '/login', pathMatch: 'full'
      }



    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EloginRoutingModule { }
