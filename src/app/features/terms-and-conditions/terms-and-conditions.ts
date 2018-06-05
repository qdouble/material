import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'os-terms-and-conditions',
  templateUrl: './terms-and-conditions.html',
  styleUrls: ['./terms-and-conditions.scss'],
  animations: [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(250)])])]
})
export class TermsAndConditions implements OnInit {
  ngOnInit() {}
}
