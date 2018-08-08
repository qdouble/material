/* tslint:disable max-line-length */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { openInNewTab } from '../helper/open-in-new-tab';

@Component({
  selector: 'os-confirm-dialog',
  template: `
  <div class="confirm-dialog">
    <h5 [style.color]="confirmColor" [innerHTML]="confirmText"></h5>
    <p [style.color]="subtextColor" [innerHTML]="subtext"></p>
    <div *ngIf="!okayOnly" class="button-row">
      <button type="button" mat-raised-button color="warn" (click)="dialogRef.close(false)">NO</button>
      <button *ngIf="!url" type="button" class="white" mat-raised-button color="primary" (click)="dialogRef.close(true)">YES</button>
      <button *ngIf="url" type="button" class="white" mat-raised-button color="primary" (click)="openLink(); dialogRef.close(true)">YES</button>
    </div>
    <div *ngIf="okayOnly" class="button-row">
      <button type="button" class="white" mat-raised-button color="primary" (click)="dialogRef.close(true)">OK</button>
    </div>
  </div>`,
  styles: [
    `.confirm-dialog{ text-align: center; max-width: 400px; }
  .confirm-dialog h5 { margin: 0 0 10px !important; word-wrap:break-word; font-size: 18px; }
  .button-row { margin-top: 5px; }
  `
  ]
})
export class ConfirmDialog {
  confirmColor = 'black';
  confirmText: string;
  okayOnly: boolean;
  subtext: string;
  subtextColor = 'black';
  url: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialog>) {}
  openLink() {
    openInNewTab(this.url);
  }
}
