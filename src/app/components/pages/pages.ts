import {
  Component, EventEmitter, Input, OnChanges, OnInit,
  Output, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'os-pages',
  template: `
  <!--
  <mat-button-toggle-group  #page [(ngModel)]="selectedPage"
    (ngModelChange)="pageOffset.emit(selectedPage)">
    <ng-container *ngIf="selectedPage !== 'all' ">
      <mat-button-toggle *ngFor="let page of pages" trackBy: trackById; [value]="page">
        {{page}}
      </mat-button-toggle>
    <mat-button-toggle *ngIf="!hideAll" value="all">
      Show All
    </mat-button-toggle>
    </ng-container>
    <ng-container>
      <mat-button-toggle *ngIf="selectedPage === 'all'" value="1">
        Show Pages
      </mat-button-toggle>
    </ng-container>
  </mat-button-toggle-group>
  -->
  `,
  styles: [`:host >>> .mat-button-toggle-label-content {padding: 0 9px;}`]
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
  trackById(index: number, page) {
    return page;
  }
}
