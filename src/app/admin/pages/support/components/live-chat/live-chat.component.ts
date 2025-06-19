import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../../../communications/services/chat.service';
import { Message } from '../../../../../communications/model/message';
import { DoctorProfile } from '../../../../../communications/model/doctor-profile';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

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
  users: DoctorProfile[] = [];
  selectedUser: DoctorProfile | null = null;
  currentUserEmail = 'admin@hormonalcare.com';
  messages: Message[] = [];
  newMessage = '';
  newMessageCounts: { [email: string]: number } = {};

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.users = this.chatService.getLiveChatUsers();

    // ✅ Solo cargar mensajes si no han sido inicializados
    const alreadyInitialized = localStorage.getItem('chat_initialized');
    if (!alreadyInitialized) {
      const mockMessages: Message[] = [
        {
          id: 1001,
          sender: 'user',
          receiverId: 'admin@hormonalcare.com',
          from: 'pedro@patient.hormonalcare.com',
          to: 'admin@hormonalcare.com',
          content: 'Hi, I’m not getting my medication reminders.',
          timestamp: '2025-06-10T15:21:00Z'
        },
        {
          id: 1002,
          sender: 'admin',
          receiverId: 'pedro@patient.hormonalcare.com',
          from: 'admin@hormonalcare.com',
          to: 'pedro@patient.hormonalcare.com',
          content: 'We’re checking your reminder configuration. Thanks!',
          timestamp: '2025-06-10T15:25:00Z'
        },
        {
          id: 1003,
          sender: 'user',
          receiverId: 'admin@hormonalcare.com',
          from: 'laura@doctor.hormonalcare.com',
          to: 'admin@hormonalcare.com',
          content: 'My patient history page shows blank.',
          timestamp: '2025-06-12T08:46:00Z'
        },
        {
          id: 1004,
          sender: 'admin',
          receiverId: 'laura@doctor.hormonalcare.com',
          from: 'admin@hormonalcare.com',
          to: 'laura@doctor.hormonalcare.com',
          content: 'Could you share a screenshot of the issue?',
          timestamp: '2025-06-12T08:47:00Z'
        },
        {
          id: 1005,
          sender: 'user',
          receiverId: 'admin@hormonalcare.com',
          from: 'marco@patient.hormonalcare.com',
          to: 'admin@hormonalcare.com',
          content: 'App crashes every time after login.',
          timestamp: '2025-06-01T12:11:00Z'
        },
        {
          id: 1006,
          sender: 'admin',
          receiverId: 'marco@patient.hormonalcare.com',
          from: 'admin@hormonalcare.com',
          to: 'marco@patient.hormonalcare.com',
          content: 'Thanks Marco, we’ll release a fix in the next update.',
          timestamp: '2025-06-01T12:15:00Z'
        },
        {
          id: 1007,
          sender: 'user',
          receiverId: 'admin@hormonalcare.com',
          from: 'andrea@doctor.hormonalcare.com',
          to: 'admin@hormonalcare.com',
          content: 'Lab results won’t open for patient #4532.',
          timestamp: '2025-06-13T17:02:00Z'
        },
        {
          id: 1008,
          sender: 'admin',
          receiverId: 'andrea@doctor.hormonalcare.com',
          from: 'admin@hormonalcare.com',
          to: 'andrea@doctor.hormonalcare.com',
          content: 'We’re checking access permissions for that lab report.',
          timestamp: '2025-06-13T17:06:00Z'
        },
        {
          id: 1009,
          sender: 'user',
          receiverId: 'admin@hormonalcare.com',
          from: 'lucia@patient.hormonalcare.com',
          to: 'admin@hormonalcare.com',
          content: 'No doctor is listed on my profile page.',
          timestamp: '2025-06-05T09:31:00Z'
        },
        {
          id: 1010,
          sender: 'admin',
          receiverId: 'lucia@patient.hormonalcare.com',
          from: 'admin@hormonalcare.com',
          to: 'lucia@patient.hormonalcare.com',
          content: 'We’ve assigned Dr. Laura Martinez to you.',
          timestamp: '2025-06-05T09:33:00Z'
        },
        {
          id: 1011,
          sender: 'user',
          receiverId: 'admin@hormonalcare.com',
          from: 'rafael@doctor.hormonalcare.com',
          to: 'admin@hormonalcare.com',
          content: 'Platform gets very slow during virtual consults.',
          timestamp: '2025-06-14T20:01:00Z'
        },
        {
          id: 1012,
          sender: 'admin',
          receiverId: 'rafael@doctor.hormonalcare.com',
          from: 'admin@hormonalcare.com',
          to: 'rafael@doctor.hormonalcare.com',
          content: 'Thanks for reporting. We’re monitoring server usage.',
          timestamp: '2025-06-14T20:05:00Z'
        }
      ];

      const groupedMessages: { [email: string]: Message[] } = {};

      mockMessages.forEach(msg => {
        const key = msg.sender === 'admin' ? msg.to : msg.from;
        const storageKey = `chat_${key}`;
        if (!groupedMessages[storageKey]) {
          groupedMessages[storageKey] = [];
        }
        groupedMessages[storageKey].push(msg);
      });

      Object.keys(groupedMessages).forEach(key => {
        localStorage.setItem(key, JSON.stringify(groupedMessages[key]));
      });

      localStorage.setItem('chat_initialized', 'true');
    }

    // Contadores de mensajes nuevos
    this.chatService.getMessages(this.currentUserEmail, '').subscribe(allMessages => {
      const grouped = allMessages.reduce((acc: { [email: string]: number }, msg) => {
        if (msg.sender !== 'admin') {
          acc[msg.from] = (acc[msg.from] || 0) + 1;
        }
        return acc;
      }, {});
      this.newMessageCounts = grouped;
    });
  }

  selectUser(user: DoctorProfile): void {
    this.selectedUser = user;
    const stored = localStorage.getItem(`chat_${user.email}`);
    this.messages = stored ? JSON.parse(stored) : [];
    delete this.newMessageCounts[user.email!];
  }

  loadMessages(): void {
    if (this.selectedUser) {
      this.chatService.getMessages(this.currentUserEmail, this.selectedUser.email).subscribe(msgs => {
        this.messages = msgs;
        setTimeout(() => {
          const el = document.querySelector('.chat-messages');
          if (el) el.scrollTop = el.scrollHeight;
        }, 100);
      });
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedUser) {
      const newMsg: Message = {
        id: Date.now(),
        sender: 'admin',
        receiverId: this.selectedUser.email || '',
        from: this.currentUserEmail,
        to: this.selectedUser.email || '',
        content: this.newMessage.trim(),
        timestamp: new Date().toISOString()
      };

      this.messages.push(newMsg);
      this.chatService.sendMessage(newMsg).subscribe();
      this.newMessage = '';

      setTimeout(() => {
        const chatBox = document.querySelector('.messages');
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
      }, 0);

      delete this.newMessageCounts[this.selectedUser.email!];

      const key = `chat_${this.selectedUser.email}`;
      localStorage.setItem(key, JSON.stringify(this.messages));
    }
  }
}
