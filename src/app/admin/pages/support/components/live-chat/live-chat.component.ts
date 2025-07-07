import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

// No se utiliza ChatService según los requisitos (solo localStorage)
// import { ChatService } from '../../../../../communications/services/chat.service';
import { Message } from '../../../../../communications/model/message';

interface ChatUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  gender: string;
  image: string;
  // Los campos fee y specialty no son necesarios para este componente específico
  // fee: number;
  // specialty: string;
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
export class LiveChatComponent implements OnInit, OnDestroy {
  // Simulación de un paciente seleccionado. En una implementación real, esto vendría de otro componente o servicio.
  selectedUser: ChatUser = {
    id: 1,
    name: 'Laura',
    lastname: 'Martinez',
    email: 'laura@patient.hormonalcare.com', // Email del paciente para la clave de localStorage
    gender: 'female',
    image: 'assets/user-avatar.png' // Avatar para el paciente
  };

  currentUserEmail = 'admin@hormonalcare.com'; // Email del administrador
  messages: Message[] = [];
  newMessage = '';
  uploadedFiles: { name: string; url: string; type?: string }[] = [];

  private messagePollingInterval: any;

  @ViewChild('chatMessagesContainer') private chatMessagesContainer!: ElementRef;

  // No se inyecta ChatService ya que no se usará backend.
  constructor() {}

  ngOnInit(): void {
    this.loadMessages();
    // Actualizar mensajes cada segundo para simular tiempo real desde localStorage
    this.messagePollingInterval = setInterval(() => {
      this.loadMessages();
    }, 1000);

    // Opcional: Cargar mensajes de prueba si el chat está vacío para este paciente
    this.initializeMockMessagesIfEmpty();
  }

  ngOnDestroy(): void {
    if (this.messagePollingInterval) {
      clearInterval(this.messagePollingInterval);
    }
  }

  private getChatStorageKey(patientEmail: string): string {
    return `admin_chat_${patientEmail}`;
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
    if (!this.selectedUser || !this.selectedUser.email) {
      this.messages = [];
      return;
    }
    const storageKey = this.getChatStorageKey(this.selectedUser.email);
    const storedMessages = localStorage.getItem(storageKey);
    const currentMessages = storedMessages ? JSON.parse(storedMessages) : [];

    if (JSON.stringify(this.messages) !== JSON.stringify(currentMessages)) {
      this.messages = currentMessages;
      // Desplazar al final solo si hay nuevos mensajes o es la carga inicial
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  // Método para inicializar con mensajes mock si el chat para el usuario seleccionado está vacío
  private initializeMockMessagesIfEmpty(): void {
    if (!this.selectedUser || !this.selectedUser.email) return;

    const storageKey = this.getChatStorageKey(this.selectedUser.email);
    const existingMessages = localStorage.getItem(storageKey);

    if (!existingMessages || JSON.parse(existingMessages).length === 0) {
      const mockMessages: Message[] = [
        {
          id: Date.now() + 1,
          sender: 'user', // Mensaje del paciente
          receiverId: this.currentUserEmail, // El admin es el receptor
          from: this.selectedUser.email,
          to: this.currentUserEmail,
          content: `Hola, soy ${this.selectedUser.name}. ¿Podrían ayudarme con una consulta?`,
          timestamp: new Date(Date.now() - 60000 * 5).toISOString() // Hace 5 minutos
        },
        {
          id: Date.now() + 2,
          sender: 'admin', // Mensaje del admin
          receiverId: this.selectedUser.email, // El paciente es el receptor
          from: this.currentUserEmail,
          to: this.selectedUser.email,
          content: `Hola ${this.selectedUser.name}, claro. ¿En qué puedo ayudarte?`,
          timestamp: new Date(Date.now() - 60000 * 3).toISOString() // Hace 3 minutos
        }
      ];
      localStorage.setItem(storageKey, JSON.stringify(mockMessages));
      this.loadMessages(); // Recargar mensajes después de añadir los mocks
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
            url: e.target.result, // Esto será una URL base64 para la vista previa y almacenamiento temporal
            // type: file.type // El tipo es opcional aquí, Message.file no lo requiere
          });
        };
        reader.readAsDataURL(file); // Convertir archivo a base64
      }
    }
  }

  sendMessage(): void {
    const trimmedMessageContent = this.newMessage.trim();
    if (!trimmedMessageContent && this.uploadedFiles.length === 0) {
      return; // No enviar mensaje vacío o sin archivos
    }

    if (!this.selectedUser || !this.selectedUser.email) {
      console.error("No hay un usuario seleccionado para enviar el mensaje.");
      return;
    }

    const storageKey = this.getChatStorageKey(this.selectedUser.email);
    const currentMessages: Message[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const timestamp = new Date().toISOString();

    // Crear mensaje de texto si existe
    if (trimmedMessageContent) {
      const textMessage: Message = {
        id: Date.now(),
        sender: 'admin', // El administrador es el emisor
        from: this.currentUserEmail, // Email del admin
        to: this.selectedUser.email, // Email del paciente seleccionado
        receiverId: this.selectedUser.email, // Manteniendo receiverId por coherencia con el modelo Message
        content: trimmedMessageContent,
        timestamp: timestamp
      };
      currentMessages.push(textMessage);
    }

    // Crear mensajes para cada archivo adjunto
    this.uploadedFiles.forEach((file, index) => {
      const fileMessage: Message = {
        id: Date.now() + index + 1, // Asegurar ID único para mensajes de archivo
        sender: 'admin',
        from: this.currentUserEmail,
        to: this.selectedUser.email,
        receiverId: this.selectedUser.email,
        content: '', // Los mensajes con archivo pueden no tener contenido de texto
        timestamp: timestamp,
        file: {
          name: file.name,
          url: file.url // Para la simulación, la URL puede ser la dataURL base64
        }
      };
      currentMessages.push(fileMessage);
    });

    localStorage.setItem(storageKey, JSON.stringify(currentMessages));
    this.messages = [...currentMessages]; // Actualizar la vista inmediatamente
    this.newMessage = ''; // Limpiar el campo de texto
    this.uploadedFiles = []; // Limpiar la lista de archivos adjuntos

    setTimeout(() => this.scrollToBottom(), 0); // Desplazar al final después de enviar
  }
}
