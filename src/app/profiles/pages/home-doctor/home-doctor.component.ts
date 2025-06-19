import { MatDialog } from '@angular/material/dialog';
import { ReassignPatientComponent } from '../../../admin/pages/reassign-patient/reassign-patient.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';
import { Location } from '@angular/common';
import { PatientsDataService } from '../../../medical-history/services/patients-data.service';
import { PatientEntity } from '../../../profiles/model/patient.entity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnnouncementService } from '../../../notifications/services/announcement.service';
import { AnnouncementEntity } from '../../../notifications/model/announcement.entity';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.css']
})
export class HomeDoctorComponent implements OnInit {
  isLoading: boolean = true;
  searchTerm: string = '';
  patients: PatientEntity[] = [];

  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private location: Location,
    private patientsDataService: PatientsDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();

    if (userType !== 'endocrinologist') {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    this.loadPatients();

    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };

    // ✅ Mostrar comunicado si existe alguno sin leer para doctores
    const unreadAnnouncements: AnnouncementEntity[] =
      this.announcementService.getUnreadForAudience('doctors');

    if (unreadAnnouncements.length > 0) {
      const announcement = unreadAnnouncements[0];

      this.snackBar.open(announcement.message, 'Cerrar', {
        duration: 8000,
        panelClass: ['announcement-snackbar']
      });

      this.announcementService.markAsRead(announcement.id);
    }
  }

  loadPatients(): void {
    this.isLoading = true;
    this.patientsDataService.getAll().subscribe({
      next: (data: PatientEntity[]) => {
        console.log('Patients loaded', data);
        this.patients = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading patients', err);
        this.isLoading = false;
      }
    });
  }

  get filteredPatients() {
    return this.patients.filter(p =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  transferPatient(patient: PatientEntity): void {
    this.router.navigate(['/doctor/transfer'], { state: { patient } });
  }

  openTransferDialog(patient: PatientEntity): void {
    const dialogRef = this.dialog.open(ReassignPatientComponent, {
      width: '400px',
      data: {
        patient,
        patientFullName: `${patient.firstName} ${patient.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Transfer completed:', result);
      }
    });
  }
}
