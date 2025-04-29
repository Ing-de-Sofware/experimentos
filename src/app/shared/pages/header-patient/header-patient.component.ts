import { Component } from '@angular/core';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrl: './header-patient.component.css'
})
export class HeaderPatientComponent {
  optionsPatients = [
    { path: '/homePatient', title: 'Home', icon: 'assets/images/home-icon.png'},
    { path: '/calendarPatientView', title: 'Calendar', icon: 'assets/images/calendar.png'},
    { path: '/messagesPatient', title: 'Messages', icon: 'assets/images/message.png'},
    { path: '/notificationsPatient', title: 'Notifications', icon: 'assets/images/bell.png'},
    { path: '/patientProfile', title: 'Profile', icon: 'assets/images/profile-icon.png'},
  ]
}
