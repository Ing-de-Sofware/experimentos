import { Component, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";

import { PatientEntity } from "../../model/patient.entity";
import {PatientsProfileService} from "../../services/patients-profile.service";
import {MedicalAppointmentsService} from "../../services/medical-appointment.service";
import {MedicalAppointmentEntity} from "../../model/medical-appointment.entity";
import {ProfilesService} from "../../services/profiles.service"; // Import ProfileService
import {forkJoin, map, Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.css']
})
export class PatientsTableComponent implements OnInit {
  appointmentData: MedicalAppointmentEntity[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'age', 'clinicHistory', 'hour', 'videoConference'];
  showMedicalHistory = false;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private patientService: PatientsProfileService,
    private medicalAppointmentService: MedicalAppointmentsService,
    private profileService: ProfilesService, // Inject ProfileService
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  navigateToMedicalHistory() {
    this.router.navigate(['/medical-history']);
  }

  ngOnInit() {
    this.getAllPatientAppointments();
  }

  private getAllPatientAppointments() {
    this.medicalAppointmentService.getAll().subscribe((response: any) => {
      this.appointmentData = response;
      this.populateDataSourceWithPatientNames();
    });
  }

  private populateDataSourceWithPatientNames() {
    const observables: Observable<any>[] = [];

    for (const appointment of this.appointmentData) {
      const observable = this.patientService.getPatientDetails(appointment.patientId.toString()).pipe(
        switchMap((patient: PatientEntity) => {
          return this.patientService.getProfileIdByPatientId(appointment.patientId).pipe(
            switchMap((profileId: number) => {
              return this.profileService.getProfileDetails(profileId.toString());
            }),
            map((profile: any) => {
              return {
                ...appointment, // Include all medical appointment details
                fullName: `${profile.fullName}`,
                age: profile.age,
                hour: `${appointment.startTime} `
              };
            })
          );
        })
      );
      observables.push(observable);
    }

    forkJoin(observables).subscribe((results: any[]) => {
      this.dataSource.data = results;
    });
  }
}
