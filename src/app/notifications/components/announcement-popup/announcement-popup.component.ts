import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { AnnouncementEntity } from '../../model/announcement.entity';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-announcement-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    NgIf
  ],
  templateUrl: './announcement-popup.component.html',
  styleUrls: ['./announcement-popup.component.css']
})
export class AnnouncementPopupComponent {
  expanded = false;

  constructor(
    public dialogRef: MatDialogRef<AnnouncementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AnnouncementEntity
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
