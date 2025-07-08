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
  // Simulación del paciente con el que el administrador está chateando.
  // Para esta US10, es un paciente fijo.
  selectedUser: ChatUser = {
    id: 1, // ID de ejemplo
    name: 'Paciente', // Nombre genérico
    lastname: 'Demo', // Apellido genérico
    email: 'patient@hormonalcare.com', // Email del paciente simulado
    gender: 'female', // Ejemplo
    image: 'assets/user-avatar.png' // Avatar para el paciente
  };

  readonly adminEmail = 'admin@hormonalcare.com'; // Email del administrador
  readonly patientEmail = 'patient@hormonalcare.com'; // Email del paciente (coincide con selectedUser.email)
  readonly chatStorageKey = 'shared_chat_messages'; // Clave compartida actualizada

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

  // Ya no se necesita patientEmail como argumento, la clave es fija.
  // private getChatStorageKey(): string {
  //   return this.chatStorageKey;
  // }

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
    // Usar la clave compartida fija
    const storedMessages = localStorage.getItem(this.chatStorageKey);
    const currentMessages = storedMessages ? JSON.parse(storedMessages) : [];

    if (JSON.stringify(this.messages) !== JSON.stringify(currentMessages)) {
      this.messages = currentMessages;
      // Desplazar al final solo si hay nuevos mensajes o es la carga inicial
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  // Método para inicializar con mensajes mock si el chat para el usuario seleccionado está vacío
  private initializeMockMessagesIfEmpty(): void {
    // Ya no depende de selectedUser.email para la clave, sino de la clave fija.
    const existingMessages = localStorage.getItem(this.chatStorageKey);

    if (!existingMessages || JSON.parse(existingMessages).length === 0) {
      const mockMessages: Message[] = [
        {
          // id: Date.now() + 1, // ID ya no es parte del modelo
          sender: this.patientEmail, // Email del paciente
          receiver: this.adminEmail,   // Email del admin
          content: `Hola, soy ${this.selectedUser.name}. ¿Podrían ayudarme con una consulta?`, // Usa el nombre del paciente simulado
          timestamp: new Date(Date.now() - 60000 * 5).toISOString()
        },
        {
          // id: Date.now() + 2,
          sender: this.adminEmail,
          receiver: this.patientEmail,
          content: `Hola ${this.selectedUser.name}, claro. ¿En qué puedo ayudarte?`,
          timestamp: new Date(Date.now() - 60000 * 3).toISOString()
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

    // Usar la clave compartida fija y los emails definidos
    const currentMessages: Message[] = JSON.parse(localStorage.getItem(this.chatStorageKey) || '[]');
    const timestamp = new Date().toISOString();

    // Crear mensaje de texto si existe
    if (trimmedMessageContent) {
      const textMessage: Message = {
        // id: Date.now(), // ID ya no es parte del modelo
        sender: this.adminEmail,       // Admin es el emisor
        receiver: this.patientEmail,   // Paciente es el receptor
        content: trimmedMessageContent,
        timestamp: timestamp
      };
      currentMessages.push(textMessage);
    }

    // Crear mensajes para cada archivo adjunto
    this.uploadedFiles.forEach((file) => { // No necesitamos index para el ID
      const fileMessage: Message = {
        // id: Date.now() + Math.random(), // ID ya no es parte del modelo, Math.random() para unicidad si fuera necesario
        sender: this.adminEmail,
        receiver: this.patientEmail,
        content: '', // Los mensajes con archivo pueden no tener contenido de texto
        timestamp: timestamp,
        file: {
          name: file.name,
          url: file.url
        }
      };
      currentMessages.push(fileMessage);
    });

    localStorage.setItem(this.chatStorageKey, JSON.stringify(currentMessages));
    this.messages = [...currentMessages]; // Actualizar la vista inmediatamente
    this.newMessage = ''; // Limpiar el campo de texto
    this.uploadedFiles = []; // Limpiar la lista de archivos adjuntos

    setTimeout(() => this.scrollToBottom(), 0); // Desplazar al final después de enviar
  }
}
