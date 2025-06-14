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
import {NgChartsModule} from "ng2-charts";
import {AdminRoutingModule} from "./admin-routing.module";
import {HomeAdminComponent} from "../profiles/pages/home-admin/home-admin.component";

@NgModule({
  declarations: [

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
    SharedModule,
    NgChartsModule,
    AdminDashboardComponent,
    AdminRoutingModule,
    HomeAdminComponent,
    ReassignPatientComponent,
    LogsComponent,
    SupportComponent,
    UserManagementComponent,
    AdminStatsComponent
  ],
  exports: [
  ]
})
export class AdminModule {}
