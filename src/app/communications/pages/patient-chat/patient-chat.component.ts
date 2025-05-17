import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';
import { Location } from '@angular/common';

interface ChatMessage {
  text: string;
  sender: 'patient' | 'doctor';
}

@Component({
  selector: 'app-patient-chat',
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.css']
})
export class PatientChatComponent implements OnInit {

  messages: ChatMessage[] = [
    {
      text: 'Hello Joseph! I inform you that tomorrow you must upload your hormonal test for our appointment on Saturday.',
      sender: 'doctor'
    },
    {
      text: 'Hello Dr. Emilio, understood. I’ll go tonight and upload it tomorrow.',
      sender: 'patient'
    },
    {
      text: 'OK thank you so much! See you this Sunday',
      sender: 'doctor'
    }
  ];

  newMessage: string = '';

  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();
    if (userType !== 'patient') {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };
  }

  sendMessage(): void {
    const trimmed = this.newMessage.trim();
    if (trimmed.length > 0) {
      this.messages.push({ text: trimmed, sender: 'patient' });
      this.newMessage = '';

      // Simulación: respuesta automática del doctor después de 1s
      setTimeout(() => {
        this.messages.push({
          text: 'Thanks for your message, I will review it soon!',
          sender: 'doctor'
        });
      }, 1000);
    }
  }
}
