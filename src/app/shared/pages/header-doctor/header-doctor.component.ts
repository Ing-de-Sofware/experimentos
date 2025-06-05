import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ColleagueSearchComponent} from "../../../communications/pages/colleague-search/colleague-search.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header-doctor',
  templateUrl: './header-doctor.component.html',
  styleUrls: ['./header-doctor.component.css'],
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    ColleagueSearchComponent,
    MatButtonModule,
  ]

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
