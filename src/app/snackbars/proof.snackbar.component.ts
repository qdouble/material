/* tslint:disable max-line-length */
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
    selector: 'os-proof-snackbar',
    template: `
    <img *ngIf="data.map" src="{{dev ? '/assets/images/' : '/images/'}}google-static-maps/{{data?.map}}">
    <div class="proof-text-box">
        <div>{{data?.firstName}} from {{data?.location}}</div>
        <div>Just Joined Level Rewards!!</div>
        <time>{{data?.createdAt | timeAgo }}</time>
    </div>
    <button mat-icon-button (click)="ref.dismissWithAction()"><mat-icon>close</mat-icon></button>
    ` // You may also use a HTML file
})
export class ProofSnackbarComponent {
    dev = ENV === 'development';
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, @Inject(MatSnackBarRef) public ref: MatSnackBarRef<any>) {
     }
 }
