import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { AppointmentsPageComponent } from './pages/appointments-page/appointments-page.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppointmentsPageComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MatCardModule
  ]
})
export class CalendarModule { }
