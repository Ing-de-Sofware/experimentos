import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.css']
})
export class NotificationsViewComponent {
  notifications = [
    {
      title: 'Cita con Gabriel Ramírez',
      description: 'Tienes una cita hoy a las 6:00 p.m.',
      date: '08/05/2025',
      time: '18:00'
    },
    {
      title: 'Nueva cita programada',
      description: 'Cita con Ana Torres el 10 de mayo a las 9:00 a.m.',
      date: '10/05/2025',
      time: '09:00'
    }
  ];
}
