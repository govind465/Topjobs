import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'skl-slogin',
  template: `
    <nav mat-tab-nav-bar mat-align-tabs="center">
    <a mat-tab-link
   *ngFor="let link of navLinks"
   [routerLink]="link.path"
   routerLinkActive #rla="routerLinkActive"
   [routerLinkActiveOptions] = "{exact:true}"
   [active]="rla.isActive">
  {{link.label}}
</a>
</nav>
<router-outlet></router-outlet>
  `,
  styles: [`.mat-tab-nav-bar { margin: 5em 20em;width: 25em;}`]
})
export class SloginComponent implements OnInit {


  navLinks = [
    { path: 'login', label: 'Sign In' },
    { path: 'signup', label: 'Sign Up' },
     ];
  constructor() { }

  ngOnInit() {
  }

}
