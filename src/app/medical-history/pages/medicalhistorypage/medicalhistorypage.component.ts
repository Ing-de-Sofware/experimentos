import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsDataService } from '../../services/patients-data.service';
import { MedicalHistoryService } from '../../../profiles/services/medical-history.service';
import { PatientEntity } from '../../../profiles/model/patient.entity';
import { MedicalHistoryEntity } from '../../../profiles/model/medical-history.entity';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medicalhistorypage',
  templateUrl: './medicalhistorypage.component.html',
  styleUrls: ['./medicalhistorypage.component.css']
})
export class MedicalhistorypageComponent implements OnInit {
  patient!: PatientEntity;
  medicalHistory!: MedicalHistoryEntity;
  medicalForm!: FormGroup;
  isLoading = true;
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientsDataService,
    private medicalHistoryService: MedicalHistoryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id);
    }
  }

  private loadData(id: string): void {
    this.patientService.getById(id).subscribe({
      next: (data) => {
        this.patient = data;
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
        this.initForm();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading medical history', err);
        this.isLoading = false;
      }
    });
  }

  initForm(): void {
    this.medicalForm = this.fb.group({
      reason: [this.medicalHistory.reason],
      family_background: [this.medicalHistory.family_background],
      personal_background: [this.medicalHistory.personal_background],
      physical_test: [this.medicalHistory.physical_test],
      external_reports: [this.medicalHistory.external_reports?.join('\n') || ''],
      weight: [Number(this.medicalHistory.weight)],
      treatment_and_medication: this.fb.array([]) // inicializamos vacío
    });

    this.loadTreatments();
    console.log('INIT FORM VALUE:', this.medicalForm.value);
    console.log('Peso encontrado: ', this.medicalHistory.weight);
  }

  loadTreatments(): void {
    this.treatmentAndMedication.clear();
    this.medicalHistory.treatment_and_medication.forEach(t => {
      this.treatmentAndMedication.push(this.createTreatmentFormGroup(t));
    });
  }

  createTreatmentFormGroup(t?: any): FormGroup {
    return this.fb.group({
      drug_name: [t?.drug_name || '', Validators.required],
      quantity: [t?.quantity || '', Validators.required],
      concentration: [t?.concentration || '', Validators.required],
      frequency: [t?.frequency || '', Validators.required],
      duration: [t?.duration || '', Validators.required]
    });
  }

  get treatmentAndMedication(): FormArray {
    return this.medicalForm.get('treatment_and_medication') as FormArray;
  }

  addTreatment(): void {
    this.treatmentAndMedication.push(this.createTreatmentFormGroup());
  }

  removeTreatment(index: number): void {
    this.treatmentAndMedication.removeAt(index);
  }

  get reasonControl(): FormControl {
    return this.medicalForm.get('reason') as FormControl;
  }
  get familyBackgroundControl(): FormControl {
    return this.medicalForm.get('family_background') as FormControl;
  }
  get personalBackgroundControl(): FormControl {
    return this.medicalForm.get('personal_background') as FormControl;
  }
  get physicalTestControl(): FormControl {
    return this.medicalForm.get('physical_test') as FormControl;
  }
  get externalReportsControl(): FormControl {
    return this.medicalForm.get('external_reports') as FormControl;
  }
  get weightControl(): FormControl {
    return this.medicalForm.get('weight') as FormControl;
  }
  getTreatmentFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveChanges(): void {
    if (this.medicalForm.invalid || !this.medicalHistory) return;

    const formValue = this.medicalForm.value;

    const updatedHistory: MedicalHistoryEntity = {
      ...this.medicalHistory,
      ...formValue,
      external_reports: formValue.external_reports
        ? formValue.external_reports.split('\n').map((r: string) => r.trim()).filter(Boolean)
        : [],
      treatment_and_medication: formValue.treatment_and_medication
    };

    this.medicalHistory = updatedHistory;

    this.snackBar.open('Historia clínica actualizada correctamente (modo local)', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
    this.isEditMode = false;
  }

    // Si más adelante activas backend, descomenta esto:
    /*
    this.medicalHistoryService.update(this.medicalHistory.id, updatedHistory).subscribe({
      next: () => {
        this.snackBar.open('Historia clínica actualizada correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.isEditMode = false;
        this.medicalHistory = updatedHistory;
      },
      error: (err) => {
        console.error('Error updating medical history', err);
        this.snackBar.open('No se pudo actualizar la historia clínica.', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
    */

}
