import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {Doctor} from "../../../communications/model/doctor.models";
import {DoctorService} from "../../../communications/services/doctor.service";

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class DoctorProfileComponent {
  doctor!: Doctor | undefined;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctor = this.doctorService.getDoctorById(doctorId);
  }
  scheduleAppointment(doctorId: number) {
    this.router.navigate(['/appointments', doctorId]);
    // Aquí puedes poner la lógica para ir a una página de agendar cita
    // o abrir un modal, etc.
  }
  // Agrega la función para navegar de regreso:
  goBack(): void {
    this.router.navigate(['/available-doctors']);
  }

}
