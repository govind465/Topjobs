import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'emp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  empId:String;
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.empId=this.route.snapshot.paramMap.get('empId')
  }
  navigateNewForm(){
    this.router.navigate(['/newjob',this.empId]);
  }
  navigateJobs(){
    this.router.navigate(['/jobs',this.empId]);
  }
  navigateShortlist(){
    this.router.navigate(['/shortlist',this.empId]);
  }
}