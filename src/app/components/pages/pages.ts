import {
  Component, EventEmitter, Input, OnChanges, OnInit,
  Output, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'os-pages',
  template: `
  <md-button-toggle-group  #page [(ngModel)]="selectedPage"
    (ngModelChange)="pageOffset.emit(selectedPage)">
    <ng-container *ngIf="selectedPage !== 'all' ">
      <md-button-toggle *ngFor="let page of pages" [value]="page">
        {{page}}
      </md-button-toggle>
    <md-button-toggle *ngIf="!hideAll" value="all">
      Show All
    </md-button-toggle>
    </ng-container>
    <ng-container>
      <md-button-toggle *ngIf="selectedPage === 'all'" value="1">
        Show Pages
      </md-button-toggle>
    </ng-container>
  </md-button-toggle-group>
  `,
  styles: [`:host >>> .md-button-toggle-label-content {padding: 0 9px;}`]
})

export class PagesComponent implements OnChanges, OnInit {
  pages: number[] = [];
  @Input() hideAll: boolean;
  @Input() hidePageText: boolean;
  @Input() itemsPerPage: number = 0;
  @Input() selectedPage: number | string = 1;
  @Input() totalItems: number = 0;
  @Output() pageOffset = new EventEmitter();
  ngOnInit() {
    this.pages = [];
    for (let i = 0; i < this.totalItems / this.itemsPerPage; i++) {
      this.pages.push(i + 1);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems']) {
      this.pages = [];
      for (let i = 0; i < changes['totalItems'].currentValue / this.itemsPerPage; i++) {
        this.pages.push(i + 1);
      }
    }
    if (changes['selectedPage'] && changes['selectedPage'].currentValue !== this.selectedPage ) {
      this.selectedPage = changes['selectedPage'].currentValue;
    }

  }
}
