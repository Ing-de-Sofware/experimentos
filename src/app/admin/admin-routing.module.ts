import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'home', loadComponent: () => import('../profiles/pages/home-admin/home-admin.component').then(m => m.HomeAdminComponent) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'stats', loadComponent: () => import('./pages/admin-stats/admin-stats.component').then(m => m.AdminStatsComponent) },
      { path: 'announcementsAdmin', loadComponent: () => import('./pages/announcements-admin/announcements-admin.component').then(m => m.AnnouncementsAdminComponent) },
      { path: 'logs', loadComponent: () => import('./pages/logs/logs.component').then(m => m.LogsComponent) },
      { path: 'reassignPatient', loadComponent: () => import('../admin/pages/reassign-patient/reassign-patient.component').then(m => m.ReassignPatientComponent) },
      { path: 'support', loadComponent: () => import('./pages/support/support.component').then(m => m.SupportComponent) },
      { path: 'user-management', loadComponent: () => import('./pages/user-management/user-management.component').then(m => m.UserManagementComponent) },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
