/* tslint:disable max-line-length */
import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'os-confirm-dialog',
  template: `
  <div class="confirm-dialog">
    <h5 [style.color]="confirmColor" [innerHTML]="confirmText"></h5>
    <p [style.color]="subtextColor" [innerHTML]="subtext"></p>
    <div class="button-row">
      <button type="button" md-raised-button color="warn" (click)="dialogRef.close(false)">NO</button>
      <button type="button" class="white" md-raised-button color="primary" (click)="dialogRef.close(true)">YES</button>
    </div>
  </div>`,
  styles: [`.confirm-dialog{ text-align: center; max-width: 400px; }
  h5 { margin: 0 0 10px !important; word-wrap:break-word; font-size: 18px; }
  `
  ]
})
export class ConfirmDialog {
  confirm: boolean;
  confirmColor = 'black';
  confirmText: string;
  subtext: string;
  subtextColor = 'black';
  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) { }
}
