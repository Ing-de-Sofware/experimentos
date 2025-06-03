import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyDialogComponent } from '../../../shared/components/privacy-dialog/privacy-dialog.component';
import { TermsDialogComponent } from '../../../shared/components/terms-dialog/terms-dialog.component';
import {
  PrivacyPolicyPersonalDataProcessingComponent
} from "../../../shared/components/privacy-policy-personal-data-processing/privacy-policy-personal-data-processing.component";
import {HelpDialogComponent} from "../../../shared/components/help-dialog/help-dialog.component";

@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrl: './footer-content.component.css'
})
export class FooterContentComponent {
  constructor(private dialog: MatDialog) {}

  openPrivacyDialog(): void {
    this.dialog.open(PrivacyDialogComponent);
  }

  openTermsDialog(): void {
    this.dialog.open(TermsDialogComponent);
  }

  openPrivacyPolicyPersonalDataProcessing(): void {
    this.dialog.open(PrivacyPolicyPersonalDataProcessingComponent);
  }
  openHelp(): void {
    this.dialog.open(HelpDialogComponent);
  }
}
