import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../models/job-application';
import { FormBuilder, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { JobApplicationService } from '../services/job-application.service';


@Component({
  selector: 'emp-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {

  empId: String;

  job: JobApplication = new JobApplication();
  constructor(private FB: FormBuilder, private router: Router, private service: JobApplicationService, private route: ActivatedRoute) { }


  submitted = false;

  Locations =

    ["Alabama", 'Alaska', 'Arizona', 'Arkansas', 'India'];



  validation_messages = {
    'companyname': [
      { type: 'pattern', message: 'No special characters are allowed' },
      { type: 'required', message: 'Full name is required' }
    ],
    'desc': [
      { type: 'maxlength', message: 'Bio cannot be more than 256 characters long' },
    ],
    'location': [
      { type: 'required', message: 'Please select location' },
    ],

    'position':
      [
        { type: 'required', message: 'Please select position' },
      ],

    'vaccancy': [
      { type: 'required', message: 'Please enter vaccancy' },
    ],
  };


  newJobForm = this.FB.group({
    companyname: ['', [Validators.required, Validators.pattern("")]],
    desc: ['Leader in IT industry', Validators.maxLength(256)],
    location: ['', Validators.required],
    position: ['', Validators.required],
    vaccancy: ['', Validators.required]

  });

  ngOnInit() {
    this.empId = this.route.snapshot.paramMap.get('empId');
  }



  onSubmit(obj) {
    console.log(obj);

    this.submitted = true;
    this.job.jobDescription = obj.position;
    this.job.noOfOpenings = obj.vaccancy;
    this.job.jobProfile = obj.desc;
    this.job.location = obj.location;
    this.job.companyName = obj.companyname;
    this.job.empId=this.empId;

    if (this.newJobForm.invalid) {
      console.log("Invalid Job");
      return;
    }
    this.service.postJobApplication(this.job).subscribe(data => {
      console.log(data);
      alert("Job posted SuccessFully.");
    });
  }

}
