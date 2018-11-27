import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {LoginSignup} from '../services/login-signup';
import {Router} from '@angular/router';
import {LoginSignupService} from '../services/login-signup.service';
import {ActivatedRoute,ParamMap} from '@angular/router';


@Component({
  selector: 'eml-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public id1;
  res:boolean;
  loginForm: FormGroup;
  submitted = false;
  logSign : LoginSignup = new LoginSignup();
  logSignNew : LoginSignup = new LoginSignup();
  constructor(private formBuilder: FormBuilder,private router: Router, private service : LoginSignupService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      empId: ['',[Validators.required]],
      password: ['',[Validators.required]]
        });
        this.route.paramMap.subscribe((params:ParamMap)=>{
          let id2=parseInt(params.get("id"));
          this.id1=id2;
        })
  }

  get f() { return this.loginForm['controls']; }

  onSubmit(values) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }  
    this.logSign.empId=values.empId;
    this.logSign.password=values.password;
    this.service.requestLogin(values.empId,values.password).subscribe( data =>{
      this.logSignNew=data;
      if(this.logSignNew!=null)
      alert("successfully login");
      else alert("login failed");
      
    });   
}

signUpComp()
{
  this.router.navigate(['/signup']);
}

}
