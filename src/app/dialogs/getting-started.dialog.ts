/* tslint:disable max-line-length */
import { Component, ViewEncapsulation } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'os-getting-started-dialog',
  template: `
  <div class="getting-started-dialog">
    <div class="top-overlay" (click)="dialogRef.close()"></div>
    <img class="getting-started-img" (click)="next()" [src]="imgSrc">
  </div>`,
  styles: [`
  .getting-started-dialog{ text-align: center; }
  .getting-started-img { width: 99%; cursor: pointer; }
  .mat-dialog-container {
    background: rgb(142, 193, 76) !important;
    padding: 0px !important;
    max-width: 90vw !important;
  }
  .top-overlay {z-index: 999999; position: absolute; width: 100%; height: 4%; cursor: pointer; }
  `],
  encapsulation: ViewEncapsulation.None
})
export class GettingStartedDialog {
  count = 1;
  imgSrc = `/assets/svg/getting-started-dialog/image${this.count}.svg`;
  constructor(public dialogRef: MdDialogRef<GettingStartedDialog>) { }
  next() {
    this.count ++;
    if (this.count <= 6) {
      this.imgSrc = `/assets/svg/getting-started-dialog/image${this.count}.svg`;
    } else {
      this.dialogRef.close();
    }
  }
}
