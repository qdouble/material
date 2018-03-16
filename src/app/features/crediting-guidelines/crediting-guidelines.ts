/* tslint:disable max-line-length */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialog } from '../../dialogs/confirm.dialog';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'os-crediting-guidelines',
  templateUrl: './crediting-guidelines.html',
  styleUrls: ['./crediting-guidelines.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(250)
      ])
    ])
  ]
})

export class CreditingGuidelines implements OnDestroy, OnInit {
  confirmDialogRef: MatDialogRef<ConfirmDialog>;
  confirmDialogConfig: MatDialogConfig = {
    disableClose: false
  };
  destroyed$: Subject<any> = new Subject<any>();
  match: boolean;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams
      .filter(query => query !== undefined)
      .forEach(query => {
        this.match = !!query['match'];
        if (query['match']) {
          this.openConfirmDialog();
        }
      });
  }

  openConfirmDialog() {
    this.confirmDialogRef = this.dialog.open(ConfirmDialog,
      this.confirmDialogRef);
    this.confirmDialogRef.componentInstance.confirmText = `Your sponsor has already accessed this offer using the same internet connection, only one completion is allowed per IP address.`;
    this.confirmDialogRef.componentInstance.confirmColor = 'red';
    this.confirmDialogRef.componentInstance.okayOnly = true;

    if (this.confirmDialogRef) {
      this.confirmDialogRef.afterClosed()
        .takeUntil(this.destroyed$)
        .subscribe(result => {
          this.confirmDialogRef = null;
        });
    }
  }

  ngOnDestroy() {

  }
}

