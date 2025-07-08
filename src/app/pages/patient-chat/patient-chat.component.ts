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
  readonly chatStorageKey = 'shared_chat_messages'; // Clave compartida actualizada

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

  constructor() {
    // Enlazar handleStorageChange al contexto correcto de 'this'
    this.handleStorageChange = this.handleStorageChange.bind(this);
  }

  ngOnInit(): void {
    this.loadMessages();
    window.addEventListener('storage', this.handleStorageChange);

    // Opcional: Cargar mensajes de prueba si el chat está vacío.
    this.initializeMockMessagesIfEmpty();
    // Se elimina messagePollingInterval
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.handleStorageChange);
    // Se elimina messagePollingInterval
  }

  // Método para manejar cambios en localStorage desde otras pestañas/ventanas
  private handleStorageChange(event: StorageEvent): void {
    if (event.key === this.chatStorageKey) {
      if (event.newValue) {
        const allMessages = JSON.parse(event.newValue);
        // Aplicar filtro
        const filteredMessages = allMessages.filter((msg: Message) =>
          (msg.sender === this.patientEmail && msg.receiver === this.adminEmail) ||
          (msg.sender === this.adminEmail && msg.receiver === this.patientEmail)
        );
        if (JSON.stringify(this.messages) !== JSON.stringify(filteredMessages)) {
          this.messages = filteredMessages;
          setTimeout(() => this.scrollToBottom(), 0);
        }
      } else {
        this.messages = []; // Correcto, vaciar si la clave se borra
        setTimeout(() => this.scrollToBottom(), 0);
      }
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
    const allMessages = storedMessages ? JSON.parse(storedMessages) : [];

    // Aplicar filtro
    const filteredMessages = allMessages.filter((msg: Message) =>
      (msg.sender === this.patientEmail && msg.receiver === this.adminEmail) ||
      (msg.sender === this.adminEmail && msg.receiver === this.patientEmail)
    );

    if (JSON.stringify(this.messages) !== JSON.stringify(filteredMessages)) {
      this.messages = filteredMessages;
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  private initializeMockMessagesIfEmpty(): void {
    const existingStoredMessages = localStorage.getItem(this.chatStorageKey);
    // Solo inicializar si la clave está totalmente vacía,
    // ya que los mocks son específicos para esta conversación.
    if (!existingStoredMessages || JSON.parse(existingStoredMessages).length === 0) {
      const mockMessages: Message[] = [
        {
          id: Date.now().toString() + '_mock_patient1',
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
        id: Date.now().toString(),
        sender: this.currentUser.email, // Paciente es el emisor
        receiver: this.chatPartner.email, // Admin es el receptor
        content: trimmedMessageContent,
        timestamp: timestamp
      };
      currentMessages.push(textMessage);
    }

    this.uploadedFiles.forEach(file => {
      const fileMessage: Message = {
        id: Date.now().toString() + `_${file.name.replace(/[^a-zA-Z0-9]/g, "")}`, // ID más robusto
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
