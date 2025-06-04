import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-privacy-policy-personal-data-processing',
  templateUrl: './privacy-policy-personal-data-processing.component.html',
  styleUrls: ['./privacy-policy-personal-data-processing.component.css'],
  standalone:true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton
  ]
})
export class PrivacyPolicyPersonalDataProcessingComponent {
  constructor(public dialogRef: MatDialogRef<PrivacyPolicyPersonalDataProcessingComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
