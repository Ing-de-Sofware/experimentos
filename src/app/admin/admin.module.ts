import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ReassignPatientComponent } from './pages/reassign-patient/reassign-patient.component';
import { LogsComponent } from './pages/logs/logs.component';
import { SupportComponent } from './pages/support/support.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AdminStatsComponent } from './pages/admin-stats/admin-stats.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ReassignPatientComponent,
    LogsComponent,
    SupportComponent,
    UserManagementComponent,
    AdminStatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    SharedModule
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class AdminModule {}
