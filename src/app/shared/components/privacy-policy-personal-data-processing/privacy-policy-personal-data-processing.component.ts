import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-privacy-policy-personal-data-processing',
  templateUrl: './privacy-policy-personal-data-processing.component.html',
  styleUrl: './privacy-policy-personal-data-processing.component.css'
})
export class PrivacyPolicyPersonalDataProcessingComponent {
  constructor(public dialogRef: MatDialogRef<PrivacyPolicyPersonalDataProcessingComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
