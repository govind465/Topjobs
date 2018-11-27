import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sek-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  today: number = Date.now();
  ngOnInit() {
  }

}
