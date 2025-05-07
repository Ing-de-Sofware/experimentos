import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsPatientsComponent } from './pages/notifications-patients/notifications-patients.component';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NotificationsPatientsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule
  ]
})
export class NotificationsModule {}
