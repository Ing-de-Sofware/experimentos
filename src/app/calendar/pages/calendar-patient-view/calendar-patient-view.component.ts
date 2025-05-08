import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-patient-view',
  templateUrl: './calendar-patient-view.component.html',
  styleUrls: ['./calendar-patient-view.component.css']
})
export class CalendarPatientViewComponent {
  showAppointments = true;
  showMedication = true;
  days = Array(7).fill(0); // Representa los 7 días de la semana

  toggleSection(section: 'appointments' | 'medication') {
    if (section === 'appointments') {
      this.showAppointments = !this.showAppointments;
    } else if (section === 'medication') {
      this.showMedication = !this.showMedication;
    }
  }
}
