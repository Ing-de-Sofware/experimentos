import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // Importar MatIconModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule

import { Message } from '../../communications/model/message'; // Ajustar ruta si es necesario

// Interfaz para el usuario del chat (simplificada para el paciente)
interface ChatParticipant {
  name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-patient-chat',
  standalone: true,
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.css'], // Crear este archivo después
  imports: [
    CommonModule,
    FormsModule,
    NgFor,
    NgIf,
    NgClass,
    DatePipe,
    MatIconModule, // Añadir MatIconModule a imports
    MatButtonModule  // Añadir MatButtonModule a imports
  ]
})
export class PatientChatComponent implements OnInit, OnDestroy {
  // Identificadores de usuario y clave de localStorage (deben ser los mismos que en admin)
  readonly adminEmail = 'admin@hormonalcare.com';
  readonly patientEmail = 'patient@hormonalcare.com'; // Email de este paciente
  readonly chatStorageKey = 'chat_admin_paciente';

  // Información del usuario actual (paciente) y del interlocutor (admin)
  currentUser: ChatParticipant = {
    name: 'Paciente Demo', // Nombre del paciente actual
    email: this.patientEmail,
    avatar: 'assets/user-avatar.png' // Avatar del paciente
  };

  chatPartner: ChatParticipant = {
    name: 'Soporte Admin', // Nombre del administrador
    email: this.adminEmail,
    avatar: 'assets/admin-avatar.png' // Avatar del administrador
  };

  messages: Message[] = [];
  newMessage = '';
  uploadedFiles: { name: string; url: string; type?: string }[] = [];

  private messagePollingInterval: any;
  @ViewChild('chatMessagesContainer') private chatMessagesContainer!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.loadMessages();
    this.messagePollingInterval = setInterval(() => {
      this.loadMessages();
    }, 1000); // Revisa nuevos mensajes cada segundo

    // Opcional: Cargar mensajes de prueba si el chat está vacío.
    // Esto podría ser redundante si el admin chat component ya lo hace.
    // Se puede comentar o ajustar si es necesario.
    this.initializeMockMessagesIfEmpty();
  }

  ngOnDestroy(): void {
    if (this.messagePollingInterval) {
      clearInterval(this.messagePollingInterval);
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.chatMessagesContainer) {
        this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  private loadMessages(): void {
    const storedMessages = localStorage.getItem(this.chatStorageKey);
    const currentMessages = storedMessages ? JSON.parse(storedMessages) : [];

    // Mostrar todos los mensajes ya que la clave es específica para esta conversación.
    // No se requiere filtrado adicional basado en sender/receiver aquí,
    // ya que se asume que chatStorageKey solo contiene mensajes entre este paciente y el admin.
    if (JSON.stringify(this.messages) !== JSON.stringify(currentMessages)) {
      this.messages = currentMessages;
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  private initializeMockMessagesIfEmpty(): void {
    const existingMessages = localStorage.getItem(this.chatStorageKey);
    if (!existingMessages || JSON.parse(existingMessages).length === 0) {
      // Solo añade mensajes si está completamente vacío, para evitar duplicados
      // si el admin component también tiene una función similar.
      const mockMessages: Message[] = [
        {
          sender: this.patientEmail,
          receiver: this.adminEmail,
          content: 'Hola Admin, tengo una pregunta rápida.',
          timestamp: new Date(Date.now() - 60000 * 2).toISOString()
        },
        {
          sender: this.adminEmail,
          receiver: this.patientEmail,
          content: 'Hola Paciente Demo, dime en qué puedo ayudarte.',
          timestamp: new Date(Date.now() - 60000 * 1).toISOString()
        }
      ];
      localStorage.setItem(this.chatStorageKey, JSON.stringify(mockMessages));
      this.loadMessages();
    }
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
            url: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  sendMessage(): void {
    const trimmedMessageContent = this.newMessage.trim();
    if (!trimmedMessageContent && this.uploadedFiles.length === 0) {
      return;
    }

    const currentMessages: Message[] = JSON.parse(localStorage.getItem(this.chatStorageKey) || '[]');
    const timestamp = new Date().toISOString();

    if (trimmedMessageContent) {
      const textMessage: Message = {
        sender: this.currentUser.email, // Paciente es el emisor
        receiver: this.chatPartner.email, // Admin es el receptor
        content: trimmedMessageContent,
        timestamp: timestamp
      };
      currentMessages.push(textMessage);
    }

    this.uploadedFiles.forEach(file => {
      const fileMessage: Message = {
        sender: this.currentUser.email,
        receiver: this.chatPartner.email,
        content: '', // Puede estar vacío si solo es un archivo
        timestamp: timestamp,
        file: {
          name: file.name,
          url: file.url
        }
      };
      currentMessages.push(fileMessage);
    });

    localStorage.setItem(this.chatStorageKey, JSON.stringify(currentMessages));
    this.messages = [...currentMessages];
    this.newMessage = '';
    this.uploadedFiles = [];
    setTimeout(() => this.scrollToBottom(), 0);
  }

  // Helper para la plantilla para determinar si el mensaje es del usuario actual (paciente)
  isMyMessage(message: Message): boolean {
    return message.sender === this.currentUser.email;
  }
}
