import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsernameValidator } from '../Validations/Username.Validator';
import { SloginService } from '../slogin.service';

import { Seeker } from '../models/seeker';

@Component({
  selector: 'skl-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponentSeeker implements OnInit {
  countries = [
    'Uruguay',
    'United States',
    'Argentina',
    'India',
    'Bhutan',
     'Bolivia',
'Bosnia',
'Botswana',
'Brazil',
'Brunei',
'Bulgaria','Burkina Faso',
'Burma',
'Burundi',
'Cambodia',
'Cameroon',
'Canada',
'Cabo Verde',
'Central African Republic',
'Chad',
    'Sri Lanka',
    'England',
    'Germany',
'Ghana',
'Greece',
'Grenada'
 ];

 states = [
   'Maharashtra',
   'AP', 'MP', 'UP', 'RJ', 'Haryana', 'Bihar'

 ];

 genders = [
   'Male',
   'Female',
   'Other'
 ];


 validation_messages = {
   'firstname': [
     { type : 'pattern', message : 'No special characters are allowed'},
     { type: 'required', message: 'First name is required' }
   ],
   'lastname': [
     { type : 'pattern', message : 'No special characters are allowed'},
     { type: 'required', message: 'Last name is required' }
   ],
   'bio': [
     { type: 'maxlength', message: 'Profile cannot be more than 256 characters long' },
   ],
   'gender': [
     { type: 'required', message: 'Please select your gender' },
   ],
   'birthday': [
     { type: 'required', message: 'Please insert your birthday' },
   ],
   'phone': [
     { type: 'required', message: 'Phone is required' },
     { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
   ],
    'city': [
     { type: 'required', message: 'City is required' },
     { type: 'pattern', message: 'Only Alphabets allowed' }
   ],

   'zipcode': [
     { type: 'required', message: 'Zipcode is required' },
     { type: 'pattern', message: 'Zipcode is incorrect' }
   ]

 };

 account_validation_messages = {
   'username': [
     { type: 'required', message: 'Username is required' },
     { type: 'minlength', message: 'Username must be at least 5 characters long' },
     { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
     { type: 'pattern', message: 'Your username must contain only numbers and letters' },
     { type: 'validUsername', message: 'This username has already been taken' }
   ],
   'email': [
     { type: 'required', message: 'Email is required' },
     { type: 'pattern', message: 'Enter a valid email' }
   ],
   'confirm_password': [
     { type: 'invalid', message: 'Password mismatch' }
   ],
   'password': [
     { type: 'required', message: 'Password is required' },
     { type: 'minlength', message: 'Password must be at least 5 characters long' },
     { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
   ],
   'terms': [
     { type: 'pattern', message: 'You must accept terms and conditions' }
   ]
 };


 seek: Seeker = new Seeker();
 constructor(private FB: FormBuilder, private router: Router, private service: SloginService) { }


 submitted = false;
 userDetailsForm = this.FB.group({
   firstname: ['', [Validators.required, Validators.pattern('^([a-z]|[A-Z]){4,8}$')]],
   lastname: ['', [Validators.required, Validators.pattern('^([a-z]|[A-Z]){4,8}$')]],
   bio: ['dummy text of the printing and typesetting industry.', Validators.maxLength(256)],
   birthday: ['', Validators.required],
   gender: ['', Validators.required],
   phone: ['', Validators.required],
   address: this.FB.group({
     state: ['',  Validators.required],
     city: [ '', [Validators.required, Validators.pattern('^([a-z]|[A-Z]){4,30}$')]],
     zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
     country: ['', Validators.required],
  }), username: ['', [
     UsernameValidator.validUsername,
     Validators.maxLength(25),
     Validators.minLength(5),
     Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
     Validators.required
    ]],
    email: ['', [  Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
    confirm_password: ['', this.Validpass],
    terms: new FormControl(false, Validators.pattern('true'))
  });


  ngOnInit() {
 }


 onSubmit(obj) {
   this.submitted = true;
     this.seek.firstName = obj.firstname;
     this.seek.lastName = obj.lastname;
     this.seek.password = obj.password;
     this.seek.emailId = obj.email;
     this.seek.dob = obj.birthday;
     this.seek.mobileno = obj.phone;
     this.seek.gender = obj.gender;
     this.seek.bio = obj.bio;
     this.seek.city = obj.address.city;
     this.seek.zipcode = obj.address.zipcode;
     this.seek.country = obj.address.country;
     this.seek.states = obj.address.state;
     this.seek.username = obj.username;

   if (this.userDetailsForm.invalid) {
       return;
   }
     this.service.signUpUser(this.seek).subscribe( data => {
        alert('User created SuccessFully.');
     });
}
  Validpass(abstract: AbstractControl) {
   if (abstract && (abstract.value !== null || abstract.value !== undefined)) {
   const cnfpass = abstract.value;

   const pass = abstract.root.get('password'); // -> root->value
   if (pass) {
       const passValue = pass.value;
       if (passValue !== cnfpass || passValue === '') {
           return {
               isError: true
           };
       }
   }
}

return null;
}

}
