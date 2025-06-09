import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsAdminComponent } from '../admin/pages/announcements-admin/announcements-admin.component';

const routes: Routes = [
  { path: 'adminDashboard/announcements', component: AnnouncementsAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
