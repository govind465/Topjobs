import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emp-employeer',
  template: `
  <emp-content>
    <router-outlet></router-outlet>
  </emp-content>      
    
  `,
  styles: []
})
export class EmployeerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
