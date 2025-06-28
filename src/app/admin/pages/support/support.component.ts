import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import {SupportTicket} from "./model/support-ticket.model";
import {LiveChatComponent} from "./components/live-chat/live-chat.component";
import {KnowledgeBaseComponent} from "./components/knowledge-base/knowledge-base.component";
import {AnalyticsComponent} from "./components/analytics/analytics.component";
import {SupportSettingsComponent} from "./components/support-settings/support-settings.component";



@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule, TicketListComponent, LiveChatComponent, KnowledgeBaseComponent, AnalyticsComponent, SupportSettingsComponent,],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  selectedTabIndex = 0;
  mockTickets: SupportTicket[] = [
    {
      id: 'TCK-001',
      createdAt: new Date().toISOString(),
      userRole: 'doctor',
      userName: 'Dr. Smith',
      userEmail: 'Smith@doctor.hormonalcare.com',
      subject: 'Issue with calendar sync',
      message: 'Google Calendar is not syncing',
      priority: 'high',
      status: 'open',
      attachments: ['screenshot1.png', 'error_log.txt']
    },
    {
      id: 'TCK-002',
      createdAt: new Date().toISOString(),
      userRole: 'patient',
      userName: 'Maria Torres',
      userEmail: 'Maria@patient.hormonalcare.com',
      subject: 'Can’t upload lab results',
      message: 'Upload fails with error 403',
      priority: 'medium',
      status: 'in_progress',
    },
    {
      id: 'TCK-003',
      createdAt: '2025-05-14T10:00:00Z',
      userRole: 'patient',
      userName: 'Alice',
      userEmail: 'alice@patient.hormonalcare.com',
      subject: 'Login Issue',
      priority: 'high',
      status: 'open',
      message: 'I can’t log into my account.',
      attachments: ['screenshot1.png', 'error_log.txt']
    },
    {
      id: 'TCK-004',
      createdAt: '2025-06-10T15:20:00Z',
      userRole: 'patient',
      userName: 'Pedro Sanchez',
      userEmail: 'pedro@patient.hormonalcare.com',
      subject: 'Medication Reminder Not Working',
      message: 'I’m not receiving reminders for my prescriptions.',
      priority: 'medium',
      status: 'open',
      attachments: ['reminder_bug.png']
    },
    {
      id: 'TCK-005',
      createdAt: '2025-06-12T08:45:00Z',
      userRole: 'doctor',
      userName: 'Dr. Laura Martinez',
      userEmail: 'laura@doctor.hormonalcare.com',
      subject: 'Patient history not loading',
      message: 'The history tab shows a blank page.',
      priority: 'high',
      status: 'in_progress',
      attachments: ['console_error.txt']
    },
    {
      id: 'TCK-006',
      createdAt: '2025-06-01T12:10:00Z',
      userRole: 'patient',
      userName: 'Marco Rojas',
      userEmail: 'marco@patient.hormonalcare.com',
      subject: 'App crashes after login',
      message: 'The app closes immediately after I log in.',
      priority: 'high',
      status: 'closed'
    },
    {
      id: 'TCK-007',
      createdAt: '2025-06-13T17:00:00Z',
      userRole: 'doctor',
      userName: 'Dr. Andrea Paredes',
      userEmail: 'andrea@doctor.hormonalcare.com',
      subject: 'Issue viewing lab results',
      message: 'Unable to open attached lab results.',
      priority: 'medium',
      status: 'open',
      attachments: ['lab_result_issue.mp4']
    },
    {
      id: 'TCK-008',
      createdAt: '2025-06-05T09:30:00Z',
      userRole: 'patient',
      userName: 'Lucia Fernandez',
      userEmail: 'lucia@patient.hormonalcare.com',
      subject: 'Can’t find assigned doctor',
      message: 'My dashboard doesn’t show any doctor assigned.',
      priority: 'low',
      status: 'resolved'
    },
    {
      id: 'TCK-009',
      createdAt: '2025-06-14T20:00:00Z',
      userRole: 'doctor',
      userName: 'Dr. Rafael Castillo',
      userEmail: 'rafael@doctor.hormonalcare.com',
      subject: 'Platform slow during consultations',
      message: 'Interface lags when switching between patients.',
      priority: 'high',
      status: 'in_progress'
    }
  ];

}
