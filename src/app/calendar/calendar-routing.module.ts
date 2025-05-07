import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsPageComponent } from './pages/appointments-page/appointments-page.component';

const routes: Routes = [
  { path: 'appointments', component: AppointmentsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
