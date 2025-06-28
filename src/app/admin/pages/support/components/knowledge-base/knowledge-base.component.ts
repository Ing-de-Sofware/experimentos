import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
interface KnowledgeItem {
  title: string;
  content: string;
}
@Component({
  selector: 'app-knowledge-base',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatLabel,
    MatIcon,
    FormsModule,
    MatInput,
    NgIf,
    MatIconButton,
    NgForOf
  ],
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.css']
})
export class KnowledgeBaseComponent {
  searchTerm = '';
  allQuestions: KnowledgeItem[] = [];
  filteredQuestions: KnowledgeItem[] = [];

  ngOnInit(): void {
    this.allQuestions = [
      {
        title: '🧑‍⚕️ ¿Cómo registrarse y comenzar a usar HormonalCare?',
        content: 'Para comenzar, descarga la app desde Google Play o App Store. Luego, ' +
                 'selecciona tu tipo de usuario (paciente o médico), completa los datos y ' +
                 'activa tu cuenta con el correo electrónico enviado.'
      },
      {
        title: '🕒 ¿Cómo programar, reprogramar o cancelar una cita médica?',
        content: 'Dirígete a la sección "Citas". ' +
                 'Puedes agendar una nueva, ver las programadas ' +
                 'o cancelarlas si aún no han comenzado.'
      },
      {
        title: '🔔 ¿Cómo funcionan los recordatorios de medicación y citas?',
        content: 'Recibirás notificaciones diarias configurables desde tu perfil. ' +
                 'Puedes activar o desactivar los recordatorios desde "Configuración".'
      },
      {
        title: '📊 ¿Qué información muestra el Dashboard del paciente o médico?',
        content: 'El dashboard incluye evolución hormonal, alertas de salud, ' +
                 'cumplimiento de medicación y accesos rápidos a herramientas ' +
                 'como el chat, citas y recordatorios.'
      },
      {
        title: '💬 ¿Cómo usar el chat médico-paciente?',
        content: 'Accede desde la sección "Comunicaciones". El chat es asincrónico ' +
                 'y permite mensajes, imágenes y respuestas del equipo médico.'
      },
      {
        title: '🔐 ¿Qué tan segura es la información que comparto?',
        content: 'Usamos cifrado AES y servidores certificados para proteger tus datos. ' +
                 'Cumplimos con la Ley de Protección de Datos Personales (LPDP) del Perú.'
      },
      {
        title: '🔑 ¿Qué hago si olvidé mi contraseña o no puedo acceder?',
        content: 'Desde la pantalla de inicio, selecciona "¿Olvidaste tu contraseña?" y ' +
                 'sigue los pasos para restablecerla vía correo.'
      },
      {
        title: '📆 ¿Puedo sincronizar mi calendario con Google Calendar u otras apps?',
        content: 'Sí. Desde Configuración, activa la sincronización con Google Calendar ' +
                 'para recibir tus citas en tu calendario habitual.'
      },
      {
        title: '🎮 ¿Cómo funciona la gamificación dentro de la app?',
        content: 'HormonalCare ofrece medallas y recompensas por cumplimiento de tareas, ' +
                 'control de citas, medicamentos y participación activa.'
      },
      {
        title: '📩 ¿Cómo contacto al equipo de soporte?',
        content: 'Desde la sección de Soporte puedes iniciar un chat en vivo, enviar un ticket ' +
                 'o acceder a esta base de conocimiento.'
      }
    ];

    this.filteredQuestions = [...this.allQuestions];
  }

  filterQuestions(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredQuestions = this.allQuestions.filter(
      q => q.title.toLowerCase().includes(term) || q.content.toLowerCase().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredQuestions = [...this.allQuestions];
  }
}

