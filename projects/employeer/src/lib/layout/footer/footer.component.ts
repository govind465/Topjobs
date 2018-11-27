import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  today: number = Date.now();

  ngOnInit() {
  }
}
