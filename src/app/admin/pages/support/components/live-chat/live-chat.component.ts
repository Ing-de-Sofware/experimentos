import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { ChatService } from '../../../../../communications/services/chat.service';
import { Message } from '../../../../../communications/model/message';

interface ChatUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  gender: string;
  image: string;
  fee: number;
  specialty: string;
}

@Component({
  selector: 'app-live-chat',
  standalone: true,
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    NgFor,
    NgIf,
    NgClass,
    DatePipe,
    MatIcon,
    MatIconButton
  ]
})
export class LiveChatComponent implements OnInit {
  selectedUser: ChatUser = {
    id: 1,
    name: 'Laura',
    lastname: 'Martinez',
    email: 'laura@patient.hormonalcare.com',
    gender: 'female',
    image: 'assets/user-avatar.png',
    fee: 0,
    specialty: ''
  };

  currentUserEmail = 'admin@hormonalcare.com';
  messages: Message[] = [];
  newMessage = '';
  uploadedFiles: { name: string; url: string; type?: string }[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Inicializar solo una vez los mensajes de prueba
    const alreadyInitialized = localStorage.getItem('chat_initialized');
    if (!alreadyInitialized) {
      const mockMessages: Message[] = [
        {
          id: 1001,
          sender: 'user',
          receiverId: 'admin@hormonalcare.com',
          from: 'laura@patient.hormonalcare.com',
          to: 'admin@hormonalcare.com',
          content: 'Hola, no recibo mis recordatorios.',
          timestamp: '2025-06-10T15:21:00Z'
        },
        {
          id: 1002,
          sender: 'admin',
          receiverId: 'laura@patient.hormonalcare.com',
          from: 'admin@hormonalcare.com',
          to: 'laura@patient.hormonalcare.com',
          content: 'Vamos a revisar tu configuración de alertas.',
          timestamp: '2025-06-10T15:25:00Z'
        }
      ];

      const storageKey = this.getSharedChatKey();
      localStorage.setItem(storageKey, JSON.stringify(mockMessages));
      localStorage.setItem('chat_initialized', 'true');
    }

    this.loadMessages();
    setInterval(() => this.loadMessages(), 1000);
  }

  private getSharedChatKey(): string {
    return 'chat_patient_admin'; // clave única compartida
  }

  private loadMessages(): void {
    const stored = localStorage.getItem(this.getSharedChatKey());
    this.messages = stored ? JSON.parse(stored) : [];
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

  sendMessage(): void {
    const trimmed = this.newMessage.trim();
    if (!trimmed && this.uploadedFiles.length === 0) return;

    const timestamp = new Date().toISOString();
    const chatKey = this.getSharedChatKey();
    const currentMessages = JSON.parse(localStorage.getItem(chatKey) || '[]');

    const newMessages: Message[] = [];

    if (trimmed.length > 0) {
      newMessages.push({
        id: Date.now(),
        sender: 'admin',
        receiverId: this.selectedUser.email,
        from: this.currentUserEmail,
        to: this.selectedUser.email,
        content: trimmed,
        timestamp
      });
      this.newMessage = '';
    }

    this.uploadedFiles.forEach(file => {
      newMessages.push({
        id: Date.now() + Math.floor(Math.random() * 1000),
        sender: 'admin',
        receiverId: this.selectedUser.email,
        from: this.currentUserEmail,
        to: this.selectedUser.email,
        content: '',
        timestamp,
        file
      });
    });

    this.uploadedFiles = [];

    currentMessages.push(...newMessages);
    localStorage.setItem(chatKey, JSON.stringify(currentMessages));
    this.messages.push(...newMessages);
  }
}
