/* tslint:disable max-line-length */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'os-ask-questions-dialog',
  template: `
  <div class="ask-questions-dialog">
    <h5 class="primary"><b>Welcome back, {{firstName}}!</b></h5>
    <p>We see you're still at Level 0.</p>
    <p>Do you have any questions or need any help leveling up?</p>
    <button type="button"  mat-button color="primary" (click)="dialogRef.close(true)">YES</button>
    <button type="button" mat-button color="warn" (click)="dialogRef.close(false)">NO</button>
  </div>`,
  styles: [`.ask-questions-dialog{ text-align: center; max-width: 400px; }
  .ask-questions-dialog h5 { margin: 0 0 10px !important; word-wrap:break-word; font-size: 17px; }
  button {width: 100%;}
  p {line-height: 1.3;}
  `
  ]
})
export class AskQuestionsDialog {
  firstName: string;
  constructor(public dialogRef: MatDialogRef<AskQuestionsDialog>) { }
}
