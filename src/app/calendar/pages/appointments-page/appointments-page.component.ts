import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.css']
})
export class AppointmentsPageComponent {
  appointments = [
    { date: '2024-05-10', time: '10:00 a.m.', doctor: 'Dr. Gohn' },
    { date: '2024-05-12', time: '2:30 p.m.', doctor: 'Dr. Alvarez' },
    { date: '2024-05-15', time: '9:00 a.m.', doctor: 'Dr. Ruiz' }
  ];
}
