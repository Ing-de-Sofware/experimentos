import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {Message} from "../../../../../communications/model/message";
import {SupportTicket} from "../../model/support-ticket.model";
import {ChatService} from "../../../../../communications/services/chat.service";
import {DoctorProfile} from "../../../../../communications/model/doctor-profile";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-reply-dialog',
  standalone: true,
  templateUrl: './reply-dialog.component.html',
  styleUrls: ['./reply-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ]
})
export class ReplyDialogComponent {
  replyMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SupportTicket,
    private chatService: ChatService
  ) {}

  sendReply(): void {
    if (this.replyMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        sender: 'admin',
        receiverId: this.data.userEmail,
        from: 'admin@hormonalcare.com',
        to: this.data.userEmail,
        content: this.replyMessage.trim(),
        timestamp: new Date().toISOString()
      };

      this.chatService.sendMessage(message).subscribe(() => {
        this.dialogRef.close(this.replyMessage); // opcional: puedes pasar mensaje como respuesta
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
