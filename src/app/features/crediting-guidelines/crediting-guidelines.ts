/* tslint:disable max-line-length */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MdDialog, MdDialogRef, MdDialogConfig,
  MdSnackBar, MdSnackBarConfig
} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialog } from '../../dialogs/confirm.dialog';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'os-crediting-guidelines',
  templateUrl: './crediting-guidelines.html',
  styleUrls: ['./crediting-guidelines.scss']
})

export class CreditingGuidelines implements OnDestroy, OnInit {
  confirmDialogRef: MdDialogRef<ConfirmDialog>;
  confirmDialogConfig: MdDialogConfig = {
    disableClose: false
  };
  destroyed$: Subject<any> = new Subject<any>();
  match: boolean;

  constructor(
    public dialog: MdDialog,
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

