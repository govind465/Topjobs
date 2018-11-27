import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentSeeker } from './login/login.component';
import { SignupComponentSeeker } from './signup/signup.component';
import { SloginComponent } from './slogin.component';



const routes: Routes = [
{
    path : 'slogin', component : SloginComponent, children : [
    {
      path: '', component : LoginComponentSeeker
    },
    {
      path: 'login', component : LoginComponentSeeker
    },
    {
      path : 'signup', component : SignupComponentSeeker
    }
]
}
     ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class SloginRoutingModule { }
