import { Component, OnInit } from '@angular/core';
import { AnnouncementEntity } from '../../../notifications/model/announcement.entity';
import { AnnouncementService } from '../../../notifications/services/announcement.service';
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-notifications-patients',
  standalone: true,
  imports: [CommonModule,MatCardSubtitle, MatCardTitle, MatSidenavContent,MatDialogModule, MatDialogModule, MatButtonModule, MatDialogModule, MatSidenavContainer, MatCard, MatCardAvatar, MatCardHeader, MatIcon, MatCardContent, MatCardActions],
  templateUrl: './notifications-patients.component.html',
  styleUrls: ['./notifications-patients.component.css']
})
export class NotificationsPatientsComponent implements OnInit {
  notifications: any[] = []; // otras notificaciones
  announcements: (AnnouncementEntity & { expanded?: boolean })[] = []; // comunicados con toggle

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('notifications');
    this.notifications = saved ? JSON.parse(saved) : [];

    // Inicializa announcements con el campo 'expanded' en false
    this.announcements = this.announcementService.getForAudience('patients')
      .map(a => ({ ...a, expanded: false }));
  }
  deleteNotification(index: number): void {
    this.notifications.splice(index, 1);
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  deleteAnnouncement(index: number): void {
    this.announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(this.announcements));
  }

  toggleDescription(announcement: AnnouncementEntity & { expanded?: boolean }): void {
    announcement.expanded = !announcement.expanded;
  }

}
