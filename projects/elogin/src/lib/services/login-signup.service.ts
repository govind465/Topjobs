import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import {LoginSignup} from './login-signup'
import { SubscriptionFeeDetails } from './subscription-fee-details';

const httpOptions={
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4200', // -->Add this line
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
})

}

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  constructor(private http : HttpClient) { } 
  private userUrl = 'http://localhost:8765/employee-registration';

  public requestLogin(email,password) {
  //  alert(this.userUrl+"/login/"+email);
    return this.http.get<LoginSignup>(this.userUrl+"/employer/login/emp/"+email+"/"+password);
  }

  public addUser(loginsignup) {
    return this.http.post<LoginSignup>(this.userUrl+"/employer/signup/emp",loginsignup);
  }
  
  public addFeeDetails(feeDetails) {
    return this.http.post<SubscriptionFeeDetails>(this.userUrl+"/employer/payfee",feeDetails);
  }
  
}
