import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sek-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs = [
    { 'id': '1', 'company': 'abc', 'position': 'lol', 'vaccancy': '12$' },
    { 'id': '2', 'company': 'xyz', 'position': 'haha', 'vaccancy': '12$' },
    { 'id': '3', 'company': 'dec', 'position': 'notforyou', 'vaccancy': '12$' },

  ];

  constructor() { }

  ngOnInit() {
  }

}
