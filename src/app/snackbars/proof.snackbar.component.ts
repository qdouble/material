/* tslint:disable max-line-length */
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'os-proof-snackbar',
  template: `
  <div class="os-proof-snackbar-content" (click)="ref.dismissWithAction()">
    <img *ngIf="data.type === 'join' " src="{{dev ? '/assets/images/' : '/images/'}}google-static-maps/{{data?.map}}">
    <div *ngIf="data.type === 'level'" class="level-image" [style.background]="'url(' + levelImage + ')'"></div>
    <div *ngIf=" data.type === 'join' " class="proof-text-box">
        <div>{{data?.firstName}} from {{data.location}}</div>
        <div>Just Joined Level Rewards!</div>
        <time>{{data.createdAt | timeAgoRecent }}</time>
    </div>
    <div *ngIf=" data.type === 'level' " class="proof-text-box type-level">
        <div>{{data.firstName}} from {{data.location}}</div>
        <div>Reached Level {{data.level}} = <b>{{'$' + (data.level * 5)}}</b> max/referral!</div>
        <time>{{data.createdAt | timeAgoRecent }}</time>
    </div>
    <button mat-icon-button><mat-icon>close</mat-icon></button>
  </div>

    ` // You may also use a HTML file
})
export class ProofSnackbarComponent {
  dev = ENV === 'development';
  levelImage: string;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    @Inject(MatSnackBarRef) public ref: MatSnackBarRef<any>
  ) {
    if (data.level) {
      this.levelImage = `/assets/png/small-level-badges/level-${
        data.level > 10 ? data.level : '0' + data.level
      }-badge-01.svg.png`;
    }
  }
}
