import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { AnnouncementEntity } from '../../model/announcement.entity';
import { MatButton } from '@angular/material/button';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-announcement-popup',
  standalone: true,
  templateUrl: './announcement-popup.component.html',
  styleUrls: ['./announcement-popup.component.css'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    CommonModule,
    NgIf
  ]
})
export class AnnouncementPopupComponent {
  expanded = false;

  constructor(
    private dialogRef: MatDialogRef<AnnouncementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AnnouncementEntity
  ) {}

  toggle(): void {
    this.expanded = !this.expanded;
  }

  close(): void {
    this.dialogRef.close();
  }
}
