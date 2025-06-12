import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-follow-up',
  templateUrl: './schedule-follow-up.component.html',
  styleUrls: ['./schedule-follow-up.component.css']
})
export class ScheduleFollowUpComponent {
  selectedMedications: { [key: string]: boolean } = {};
  medications: string[] = [
    'Levotiroxina', 'Metformina', 'Estrógeno y progesterona',
    'Testosterona', 'Corticosteroides', 'Levotiroxina'
  ];

  exams: string[] = ['Hormonal test', 'Blood test'];

  selectedExams: string[] = [];
  selectedDateTime: string = '';
  patientName: string = '';
  patientAge: number = 0;
  doctorName: string = '';

  showSuccessMessage: boolean = false;
  successMessageText: string = '';

  constructor(private router: Router) {
    const state = history.state;
    this.patientName = state.patientName || 'Paciente';
    this.patientAge = state.patientAge || 0;
    this.doctorName = state.doctorName || 'Médico';
  }

  scheduleAppointment() {
    if (this.selectedDateTime.trim()) {
      this.showSuccessMessage = true;
      this.successMessageText = 'Appointment successfully scheduled and notification sent to the patient.';

      // Create notification object
      const formattedDate = new Date(this.selectedDateTime).toLocaleString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const notification = {
        title: 'Nueva Cita Médica',
        message: `Se te ha asignado una nueva cita el ${formattedDate} con el ${this.doctorName}.`,
        date: new Date().toISOString(),
        doctorName: this.doctorName,
        fecha: formattedDate,
        icon: 'calendar_today'
      };

      // Retrieve existing notifications or create new array
      const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      existingNotifications.push(notification);

      // Save updated notifications back to localStorage
      localStorage.setItem('notifications', JSON.stringify(existingNotifications));

      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  }
}
