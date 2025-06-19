import { Component, OnInit } from '@angular/core';
import { AnnouncementEntity } from '../../../notifications/model/announcement.entity';
import { AnnouncementService } from '../../../notifications/services/announcement.service';

@Component({
  selector: 'app-notifications-patients',
  templateUrl: './notifications-patients.component.html',
  styleUrls: ['./notifications-patients.component.css']
})
export class NotificationsPatientsComponent implements OnInit {
  notifications: any[] = []; // otras notificaciones
  announcements: AnnouncementEntity[] = []; // comunicados del admin

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    // Cargar otras notificaciones (mantiene tu lógica original)
    const saved = localStorage.getItem('notifications');
    this.notifications = saved ? JSON.parse(saved) : [];

    // Cargar comunicados del admin para pacientes
    this.announcements = this.announcementService.getForAudience('patients');
  }

  deleteNotification(index: number): void {
    this.notifications.splice(index, 1);
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  deleteAnnouncement(index: number): void {
    this.announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(this.announcements));
  }
}
