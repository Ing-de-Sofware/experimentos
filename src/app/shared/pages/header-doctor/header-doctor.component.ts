import { Component } from '@angular/core';

@Component({
  selector: 'app-header-doctor',
  templateUrl: './header-doctor.component.html',
  styleUrl: './header-doctor.component.css'
})
export class HeaderDoctorComponent {
  options = [
    { path: '/homeDoctor', title: 'Home', icon: 'assets/images/home-icon.png'},
    { path: '/calendar', title: 'Calendar', icon: 'assets/images/calendar.png'},
    { path: '/messages', title: 'Messages', icon: 'assets/images/message.png'},
    { path: '/notifications', title: 'Notifications', icon: 'assets/images/bell.png'},
    { path: '/doctorProfile', title: 'Profile', icon: 'assets/images/profile-icon.png'},
  ]
}
