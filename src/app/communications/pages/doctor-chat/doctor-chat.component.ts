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

interface ChatThread {
  userId: string;
  userName: string;
  messages: ChatMessage[];
}

@Component({
  selector: 'app-doctor-chat',
  templateUrl: './doctor-chat.component.html',
  styleUrls: ['./doctor-chat.component.css']
})
export class DoctorChatComponent implements OnInit {
  users = [
    { userId: 'joseph', name: 'Joseph López' },
    { userId: 'camila', name: 'Camila Torres' },
    { userId: 'maria', name: 'María Pérez' }
  ];

  chatThreads: ChatThread[] = [];
  selectedUserId: string = '';
  selectedUserName: string = '';
  newMessage: string = '';
  uploadedFiles: { name: string; url: string; type?: string }[] = [];

  ngOnInit(): void {
    const saved = localStorage.getItem('chat_threads');
    if (saved) {
      this.chatThreads = JSON.parse(saved);
    }
    if (!saved || this.chatThreads.length === 0) {
      this.chatThreads = this.users.map(user => ({
        userId: user.userId,
        userName: user.name,
        messages: []
      }));
      this.selectChat(this.chatThreads[0].userId);
    } else if (this.chatThreads.length > 0) {
      this.selectChat(this.chatThreads[0].userId);
    }
  }

  selectChat(userId: string): void {
    const thread = this.chatThreads.find(t => t.userId === userId);
    if (thread) {
      this.selectedUserId = userId;
      this.selectedUserName = thread.userName;
    }
  }

  get selectedMessages(): ChatMessage[] {
    return (
      this.chatThreads.find(t => t.userId === this.selectedUserId)?.messages || []
    );
  }

  sendMessage(): void {
    const trimmed = this.newMessage.trim();
    const thread = this.chatThreads.find(t => t.userId === this.selectedUserId);
    if (!thread) return;

    if (trimmed.length > 0) {
      const msg: ChatMessage = {
        text: trimmed,
        sender: 'doctor',
        timestamp: new Date()
      };
      thread.messages.push(msg);
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
      thread.messages.push(fileMessage);
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
    localStorage.setItem('chat_threads', JSON.stringify(this.chatThreads));
  }

  clearChat(): void {
    const thread = this.chatThreads.find(t => t.userId === this.selectedUserId);
    if (thread) {
      thread.messages = [];
      this.saveMessages();
    }
  }

  protected readonly localStorage = localStorage;
}
