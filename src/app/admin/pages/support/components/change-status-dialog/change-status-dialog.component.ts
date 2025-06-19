import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-status-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './change-status-dialog.component.html',
  styleUrls: ['./change-status-dialog.component.css']
})
export class ChangeStatusDialogComponent {
  newStatus: string = this.data.currentStatus;

  constructor(
    public dialogRef: MatDialogRef<ChangeStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentStatus: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmChange(): void {
    this.dialogRef.close(this.newStatus);
  }
}
