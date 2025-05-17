import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-terms-dialog',
  templateUrl: './terms-dialog.component.html',
  styleUrl: './terms-dialog.component.css',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton
  ]
})
export class TermsDialogComponent {
  constructor(public dialogRef: MatDialogRef<TermsDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
