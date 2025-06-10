import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';
import { FindDoctorsPatientComponent} from "../../components/find-doctors-patient/find-doctors-patient.component";
import {CommonModule} from "@angular/common";

import { MatGridListModule} from "@angular/material/grid-list";
import { MatIconModule } from '@angular/material/icon';
import {PatientsReminderComponent} from "../../components/patients-reminder/patients-reminder.component";
import {AppModule} from "../../../app.module";
import {PatientsPendingTaskComponent} from "../../components/patients-pending-task/patients-pending-task.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-home-patient',
  standalone:true,
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css'],
  imports: [CommonModule, PatientsReminderComponent, PatientsPendingTaskComponent, MatGridListModule, FindDoctorsPatientComponent, MatButton, RouterLink, MatIconModule]
})
export class HomePatientComponent implements OnInit {

  selectedExam: File | null = null;

  constructor(
    private userTypeService: UserTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();

    // ✅ Si no es paciente, redirige
    if (userType !== 'patient') {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    // ✅ Bloquea el retroceso a login
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };
  }

  // ✅ Manejador para input file
  onExamSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedExam = input.files[0];
    }
  }
}
