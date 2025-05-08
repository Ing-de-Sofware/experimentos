import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsPageComponent } from './pages/appointments-page/appointments-page.component';
import { ScheduleFollowUpComponent } from './pages/schedule-follow-up/schedule-follow-up.component';

const routes: Routes = [
  { path: 'appointments', component: AppointmentsPageComponent },
  { path: 'schedule-follow-up/:id', component: ScheduleFollowUpComponent } // ✅ NUEVA RUTA
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
