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

@Component({
  selector: 'app-patient-chat',
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.css']
})
export class PatientChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  localStorageKey: string = 'chat_messages';
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

    const saved = localStorage.getItem(this.localStorageKey);
    if (saved) {
      this.messages = JSON.parse(saved);
    } else {
      this.messages = [];
    }
  }

  sendMessage(): void {
    const trimmed = this.newMessage.trim();
    if (trimmed.length > 0) {
      const msg: ChatMessage = {
        text: trimmed,
        sender: 'patient',
        timestamp: new Date()
      };
      this.messages.push(msg);
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
      this.messages.push(fileMessage);
    });

    this.uploadedFiles = [];
    this.saveMessages();
  }

  saveMessages(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.messages));
  }

  onFileSelected(event: any): void {
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
        reader.readAsDataURL(file); // permite cargar cualquier archivo
      }
    }
  }

  handleFileUpload(event: any): void {
    this.onFileSelected(event);
  }

  clearChat(): void {
    this.messages = [];
    localStorage.removeItem(this.localStorageKey);
  }
}
