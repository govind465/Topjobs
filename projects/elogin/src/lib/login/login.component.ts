import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import  { LoginSignupService } from '../services/login-signup.service';
import { LoginSignup } from '../services/login-signup';

@Component({
  selector: 'eml-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  countries = [{'id':1, 'name':'India'}, {'id':2, 'name': 'USA'}, {'id':3, 'name': 'UK'}];
  logSign : LoginSignup = new LoginSignup();
  logSignNew : LoginSignup = new LoginSignup();  
  constructor(private formBuilder: FormBuilder,private router: Router, private service : LoginSignupService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.pattern("[A-Z][a-z]{0,}")]],
      lastName: ['', [Validators.required,Validators.pattern("[A-Z][a-z]{0,}")]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
      confirmPassword: ['', Validators.required],
      country:['India',Validators.required],             // this.formBuilder.control(1),
      gender:['male',Validators.required],// new FormControl('1')
      terms:['',Validators.required]
  }, { 
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  get f() { return this.registerForm['controls']; }

  onSubmit(obj) {
      this.submitted = true;
        this.logSign.firstName=obj.firstName;
        this.logSign.lastName=obj.lastName;
        this.logSign.emailId=obj.emailId;
        this.logSign.gender=obj.gender;
        this.logSign.country=obj.country;
        this.logSign.password=obj.password;
       
      // stop here if form is invalid
      /*
      if (this.registerForm.invalid) {
          console.log("Invalid");
          return;
      }
      */
      
        this.service.addUser(this.logSign).subscribe( data =>{
            console.log(data);
            this.logSignNew=data;
           if(this.logSignNew==null)
           alert("email id already registered! Please registered with another email id");
           else
           {
           
            alert("User created SuccessFully.");
            this.router.navigate(["/elogin/login"]);
        }
        });

}
logInComp()
{
    this.router.navigate(['/elogin/login']);
}
}
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
  
}
