/* tslint:disable max-line-length */
import { Component, ViewEncapsulation } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { openInNewTab } from '../helper/open-in-new-tab';

@Component({
  selector: 'os-ask-questions-dialog',
  template: `
  <div class="ask-questions-dialog">
    <h5 class="primary"><b>Welcome back, {{firstName}}!</b></h5>
    <p>We see you're still at Level 0.</p>
    <p>Do you have any questions or need any help leveling up?</p>
    <button type="button"  md-button color="primary" (click)="dialogRef.close(true)">YES</button>
    <button type="button" md-button color="warn" (click)="dialogRef.close(false)">NO</button>
  </div>`,
  styles: [`.ask-questions-dialog{ text-align: center; max-width: 400px; }
  .ask-questions-dialog h5 { margin: 0 0 10px !important; word-wrap:break-word; font-size: 17px; }
  button {width: 100%;}
  p {line-height: 1.3;}
  `
  ],
  encapsulation: ViewEncapsulation.None
})
export class AskQuestionsDialog {
  firstName: string;
  constructor(public dialogRef: MdDialogRef<AskQuestionsDialog>) { }
}
