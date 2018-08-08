import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'os-faq',
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss'],
  animations: [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(250)])])]
})
export class FAQ implements OnInit {
  ngOnInit() {}
}
