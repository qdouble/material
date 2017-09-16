import { Component } from '@angular/core';

@Component({
  selector: 'os-faq',
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})

export class FAQ {
  ngOnInit() {
    (typeof document !== 'undefined' && document.getElementById('os-toolbar')) ? (document.getElementById('os-toolbar').scrollIntoView()) : {};  // tslint:disable-line
  }
}
