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

  acknowledge(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }
}
