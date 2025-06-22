import { Component, OnInit } from '@angular/core';
import {AnnouncementService} from "../../services/announcement.service";
import {AnnouncementEntity} from "../../model/announcement.entity";


interface Notification {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.css']
})
export class NotificationsViewComponent implements OnInit {
  notifications: Notification[] = [
    {
      title: 'Cita con Gabriel Ramírez',
      description: 'Tienes una cita hoy a las 6:00 p.m.',
      date: '08/05/2025',
      time: '18:00',
      expanded: false
    },
    {
      title: 'Nueva cita programada',
      description: 'Cita con Ana Torres el 10 de mayo a las 9:00 a.m.',
      date: '10/05/2025',
      time: '09:00',
      expanded: false
    }
  ];

  announcements: (AnnouncementEntity & { expanded: boolean })[] = [];

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcements = this.announcementService
      .getForAudience('doctors')
      .map(a => ({ ...a, expanded: false }));
  }

  toggle(index: number): void {
    this.notifications[index].expanded = !this.notifications[index].expanded;
  }

  remove(index: number): void {
    this.notifications.splice(index, 1);
  }

  toggleDescription(a: any): void {
    a.expanded = !a.expanded;
  }

  deleteAnnouncement(index: number): void {
    this.announcements.splice(index, 1);
  }
}
