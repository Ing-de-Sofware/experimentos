import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../services/user-type.service';
import { UserType } from '../../model/user-type.model';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrls: ['./header-patient.component.css'],
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton
  ]

})
export class HeaderPatientComponent {
  constructor(private router: Router) {
  }
  optionsPatients = [
    { path: '/homePatient', title: 'Home', icon: 'assets/images/home-icon.png'},
    { path: '/calendarPatientView', title: 'Calendar', icon: 'assets/images/calendar.png'},
    { path: '/messagesPatient', title: 'Messages', icon: 'assets/images/message.png'},
    { path: '/notificationsPatient', title: 'Notifications', icon: 'assets/images/bell.png'},
    { path: '/patientProfile', title: 'Profile', icon: 'assets/images/profile-icon.png'},
  ]
  navigateToDoctors() {
    this.router.navigate(['/available-doctors']);
  }
}
