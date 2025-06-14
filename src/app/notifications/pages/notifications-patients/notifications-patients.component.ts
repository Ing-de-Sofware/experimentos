import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications-patients',
  templateUrl: './notifications-patients.component.html',
  styleUrls: ['./notifications-patients.component.css']
})
export class NotificationsPatientsComponent implements OnInit {
  notifications: any[] = [];

  ngOnInit(): void {
    const saved = localStorage.getItem('notifications');
    this.notifications = saved ? JSON.parse(saved) : [];
  }

  deleteNotification(index: number): void {
    this.notifications.splice(index, 1);
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }
}
