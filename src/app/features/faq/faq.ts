import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'os-faq',
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss'],
  animations: [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(250)])])]
})
export class FAQ implements OnInit {
  ngOnInit() {
    typeof document !== 'undefined' && document.getElementById('os-toolbar')
      ? document.getElementById('os-toolbar').scrollIntoView()
      : {}; // tslint:disable-line
  }
}
