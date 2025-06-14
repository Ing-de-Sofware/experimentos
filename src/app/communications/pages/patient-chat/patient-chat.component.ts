import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';

interface ChatMessage {
  text?: string;
  sender: 'patient' | 'doctor';
  timestamp: Date;
  file?: {
    name: string;
    url: string;
    type?: string;
  };
}

interface ChatUser {
  userId: string;
  name: string;
}

@Component({
  selector: 'app-patient-chat',
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.css']
})
export class PatientChatComponent implements OnInit {
  users: ChatUser[] = [
    { userId: 'medico1', name: 'Dr. Gonzales' },
    { userId: 'medico2', name: 'Dr. Martínez' },
    { userId: 'medico3', name: 'Dr. Pérez' }
  ];

  selectedUserId: string = this.users[0].userId;
  selectedUser: ChatUser = this.users[0];
  selectedMessages: ChatMessage[] = [];
  newMessage: string = '';
  uploadedFiles: { name: string; url: string; type?: string }[] = [];

  constructor(
    private userTypeService: UserTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();
    if (userType !== 'patient') {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    this.loadMessages(this.selectedUserId);
  }

  getLocalStorageKey(userId: string): string {
    return `chat_messages_patient_${userId}`;
  }

  loadMessages(userId: string): void {
    const saved = localStorage.getItem(this.getLocalStorageKey(userId));
    this.selectedMessages = saved ? JSON.parse(saved) : [];
  }

  saveMessages(): void {
    localStorage.setItem(this.getLocalStorageKey(this.selectedUserId), JSON.stringify(this.selectedMessages));
  }

  selectChat(userId: string): void {
    this.selectedUserId = userId;
    this.selectedUser = this.users.find(u => u.userId === userId) || this.selectedUser;
    this.loadMessages(userId);
  }

  sendMessage(): void {
    const trimmed = this.newMessage.trim();
    if (trimmed.length > 0) {
      const msg: ChatMessage = {
        text: trimmed,
        sender: 'patient',
        timestamp: new Date()
      };
      this.selectedMessages.push(msg);
      this.newMessage = '';
    }

    this.uploadedFiles.forEach(file => {
      const fileMessage: ChatMessage = {
        sender: 'patient',
        timestamp: new Date(),
        file: {
          name: file.name,
          url: file.url,
          type: file.type
        }
      };
      this.selectedMessages.push(fileMessage);
    });

    this.uploadedFiles = [];
    this.saveMessages();
  }

  handleFileUpload(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedFiles.push({
            name: file.name,
            url: e.target.result,
            type: file.type
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  clearChat(): void {
    this.selectedMessages = [];
    localStorage.removeItem(this.getLocalStorageKey(this.selectedUserId));
  }
}
