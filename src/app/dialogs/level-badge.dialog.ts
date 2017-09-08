/* tslint:disable max-line-length */
import { Component, ViewEncapsulation } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'os-level-badge-dialog',
  template: `
  <div class="level-badge-dialog">
    <img (click)="dialogRef.close()" [src]="'assets/svg/badges/level-' + level + '-badge-01.svg'">
    <!-- <button type="button" class="white" md-raised-button color="primary" (click)="dialogRef.close(true)">OK</button> -->
  </div>`,
  styles: [`.level-badge-dialog{ text-align: center; }
  .level-badge-dialog h5 { margin: 0 0 10px !important; word-wrap:break-word; font-size: 18px; }
  img { width: 530px; max-width: 115%; margin: -24px; }
  `
  ]
})
export class LevelBadgeDialog {
  level = '00';
  constructor(public dialogRef: MdDialogRef<LevelBadgeDialog>) { }
}
