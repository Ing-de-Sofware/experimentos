import { Component, OnInit } from '@angular/core';

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
  selector: 'app-doctor-chat',
  templateUrl: './doctor-chat.component.html',
  styleUrls: ['./doctor-chat.component.css']
})
export class DoctorChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  selectedUserName: string = 'Joseph López';
  localStorageKey: string = 'chat_messages';
  uploadedFiles: { name: string; url: string; type?: string }[] = [];

  ngOnInit(): void {
    const saved = localStorage.getItem(this.localStorageKey);
    if (saved) {
      this.messages = JSON.parse(saved);
    }
  }

  sendMessage(): void {
    const trimmed = this.newMessage.trim();
    if (trimmed.length > 0) {
      const msg: ChatMessage = {
        text: trimmed,
        sender: 'doctor',
        timestamp: new Date()
      };
      this.messages.push(msg);
      this.newMessage = '';
    }

    this.uploadedFiles.forEach(file => {
      const fileMessage: ChatMessage = {
        sender: 'doctor',
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

  saveMessages(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.messages));
  }

  clearChat(): void {
    this.messages = [];
    localStorage.removeItem(this.localStorageKey);
  }

  protected readonly localStorage = localStorage;
}
