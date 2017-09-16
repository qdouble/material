import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'os-terms-and-conditions',
  templateUrl: './terms-and-conditions.html',
  styleUrls: ['./terms-and-conditions.scss']
})

export class TermsAndConditions implements OnInit {
  ngOnInit() {
    (typeof document !== 'undefined' && document.getElementById('os-toolbar')) ? (document.getElementById('os-toolbar').scrollIntoView()) : {};  // tslint:disable-line
  }
}

