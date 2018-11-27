import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sek-seeker',
  template: `
  <sek-content>
  <router-outlet></router-outlet>
</sek-content>
  `,
  styles: []
})
export class SeekerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
