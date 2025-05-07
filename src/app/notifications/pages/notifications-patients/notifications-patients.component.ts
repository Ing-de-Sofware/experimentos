import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-patients',
  templateUrl: './notifications-patients.component.html',
  styleUrls: ['./notifications-patients.component.css']
})
export class NotificationsPatientsComponent {
  notifications = [
    {
      id: 1,
      title: 'Appointment Reminder',
      message: 'You have an appointment tomorrow at 10:00 AM.',
      icon: 'event',
      date: new Date()
    },
    {
      id: 2,
      title: 'Pill Reminder',
      message: 'Don’t forget to take your diabetes pills at 6:15 p.m. today.',
      icon: 'medication',
      date: new Date()
    }
  ];

  acknowledge(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
}
