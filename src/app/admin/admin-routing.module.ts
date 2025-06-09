import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { LogsComponent } from './pages/logs/logs.component';
import { SupportComponent } from './pages/support/support.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AnnouncementsAdminComponent } from './pages/announcements-admin/announcements-admin.component';
import {ReassignPatientComponent} from "./pages/reassign-patient/reassign-patient.component";
import {HomeAdminComponent} from "../profiles/pages/home-admin/home-admin.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige /admin a /admin/home
  { path: 'home', component: HomeAdminComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'reassignPatient', component: ReassignPatientComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'support', component: SupportComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'announcementsAdmin', component: AnnouncementsAdminComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
