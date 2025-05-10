import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsPageComponent } from './pages/appointments-page/appointments-page.component';
import { ScheduleFollowUpComponent } from './pages/schedule-follow-up/schedule-follow-up.component';
import {CalendarDoctorComponent} from "./components/calendar-doctor/calendar-doctor.component";
import {CalendarViewComponent} from "./pages/calendar-view/calendar-view.component";

const routes: Routes = [
  { path: 'appointments', component: AppointmentsPageComponent },
  { path: '', component: CalendarViewComponent},
  { path: 'schedule-follow-up/:id', component: ScheduleFollowUpComponent } // ✅ NUEVA RUTA
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
