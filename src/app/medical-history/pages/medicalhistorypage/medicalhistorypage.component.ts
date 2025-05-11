import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsDataService } from '../../services/patients-data.service';
import { MedicalHistoryService } from '../../../profiles/services/medical-history.service';
import { PatientEntity } from '../../../profiles/model/patient.entity';
import { MedicalHistoryEntity } from '../../../profiles/model/medical-history.entity';

@Component({
  selector: 'app-medicalhistorypage',
  templateUrl: './medicalhistorypage.component.html',
  styleUrls: ['./medicalhistorypage.component.css']
})
export class MedicalhistorypageComponent implements OnInit {
  patient!: PatientEntity;
  medicalHistory!: MedicalHistoryEntity;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientsDataService,
    private medicalHistoryService: MedicalHistoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log("ID recibido:", id);
      this.loadData(id);
    }
  }

  private loadData(id: string): void {
    this.patientService.getById(id).subscribe({
      next: (data) => {
        this.patient = data;
        console.log("Patient data:", this.patient);
        this.loadMedicalHistory(id);
      },
      error: (err) => {
        console.error('Error loading patient data', err);
        this.isLoading = false;
      }
    });
  }

  private loadMedicalHistory(patientId: string): void {
    this.medicalHistoryService.getByPatientId(patientId).subscribe({
      next: (history) => {
        this.medicalHistory = history;
        console.log("Medical history:", this.medicalHistory);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading medical history', err);
        this.isLoading = false;
      }
    });
  }
}

