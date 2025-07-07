import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';

interface ChatMessage {
  text?: string;
  sender: 'patient' | 'doctor' | 'admin';
  timestamp: Date;
  file?: {
    name: string;
    url: string;
    type?: string;
  };
}

@Component({
  selector: 'app-patient-chat',
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.css']
})
export class PatientChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  uploadedFiles: { name: string; url: string; type?: string }[] = [];
  chatTarget: 'doctor' | 'admin' = 'doctor';

  constructor(
    private userTypeService: UserTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();
    if (userType !== 'patient') {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    this.loadMessages();

    setInterval(() => {
      const updated = localStorage.getItem(this.getSharedChatKey());
      if (updated) {
        const parsed = JSON.parse(updated);
        if (JSON.stringify(parsed) !== JSON.stringify(this.messages)) {
          this.messages = parsed;
        }
      }
    }, 2000);
  }

  private getSharedChatKey(): string {
    // Clave compartida entre paciente y doctor/admin
    return this.chatTarget === 'doctor'
      ? 'chat_patient_doctor'
      : 'chat_patient_admin';
  }

  switchTarget(target: 'doctor' | 'admin'): void {
    this.chatTarget = target;
    this.loadMessages();
  }

  loadMessages(): void {
    const saved = localStorage.getItem(this.getSharedChatKey());
    this.messages = saved ? JSON.parse(saved) : [];
  }

  sendMessage(): void {
    const trimmed = this.newMessage.trim();
    const timestamp = new Date();
    const newMessages: ChatMessage[] = [];

    if (trimmed.length > 0) {
      newMessages.push({
        text: trimmed,
        sender: 'patient',
        timestamp
      });
      this.newMessage = '';
    }

    this.uploadedFiles.forEach(file => {
      newMessages.push({
        sender: 'patient',
        timestamp,
        file: {
          name: file.name,
          url: file.url,
          type: file.type
        }
      });
    });

    this.uploadedFiles = [];
    this.messages.push(...newMessages);

    const chatKey = this.getSharedChatKey();
    const current = JSON.parse(localStorage.getItem(chatKey) || '[]');
    current.push(...newMessages);
    localStorage.setItem(chatKey, JSON.stringify(current));
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
    this.messages = [];
    localStorage.setItem(this.getSharedChatKey(), JSON.stringify([]));
  }
}
