import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsDataService } from '../../services/patients-data.service';
import { MedicalHistoryService } from '../../../profiles/services/medical-history.service';
import { PatientEntity } from '../../../profiles/model/patient.entity';
import { MedicalHistoryEntity } from '../../../profiles/model/medical-history.entity';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';
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
        this.medicalHistory = {
          ...history,
          external_reports: JSON.parse(localStorage.getItem(`reports_list_${history.patient_id}`) || '[]')
        };
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
      external_reports: this.fb.array([]),
      weight: [Number(this.medicalHistory.weight)],
      treatment_and_medication: this.fb.array([]),
      diagnostic: this.fb.array([]),
      medical_exams: this.fb.array([]),
    });

    this.loadTreatments();
    this.loadDiagnostics();
    this.loadMedicalExams();
    this.loadExternalReports();
  }

  loadTreatments(): void {
    this.treatmentAndMedication.clear();
    this.medicalHistory.treatment_and_medication.forEach(t => {
      this.treatmentAndMedication.push(this.createTreatmentFormGroup(t));
    });
  }

  loadDiagnostics(): void {
    this.diagnostic.clear();
    this.medicalHistory.diagnostic.forEach(d => {
      this.diagnostic.push(this.createDiagnosisFormGroup(d));
    });
  }

  loadMedicalExams(): void {
    this.medicalExams.clear();
    this.medicalHistory.medical_exams.forEach(exam => {
      this.medicalExams.push(this.createMedicalExamFormGroup(exam));
    });
  }

  loadExternalReports(): void {
    this.externalReports.clear();

    this.medicalHistory.external_reports.forEach(report => {
      // Si ya está en formato nombre::clave lo agregamos directo
      if (report.includes('::')) {
        this.externalReports.push(this.fb.control(report, Validators.required));
      } else {
        // Buscar en localStorage por posibles claves
        const keys = Object.keys(localStorage);
        const match = keys.find(k => k.includes(report));
        if (match) {
          this.externalReports.push(this.fb.control(`${report}::${match}`, Validators.required));
        } else {
          this.externalReports.push(this.fb.control(report, Validators.required)); // solo el nombre
        }
      }
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

  createDiagnosisFormGroup(value = ''): FormGroup {
    return this.fb.group({
      value: [value, Validators.required]
    });
  }

  createMedicalExamFormGroup(value = ''): FormGroup {
    return this.fb.group({
      value: [value, Validators.required]
    });
  }


  get externalReports(): FormArray {
    return this.medicalForm.get('external_reports') as FormArray;
  }

  get treatmentAndMedication(): FormArray {
    return this.medicalForm.get('treatment_and_medication') as FormArray;
  }

  get diagnostic(): FormArray {
    return this.medicalForm.get('diagnostic') as FormArray;
  }
  get medicalExams(): FormArray {
    return this.medicalForm.get('medical_exams') as FormArray;
  }

  addTreatment(): void {
    this.treatmentAndMedication.push(this.createTreatmentFormGroup());
  }

  removeTreatment(index: number): void {
    this.treatmentAndMedication.removeAt(index);
  }

  addDiagnostic(): void {
    this.diagnostic.push(this.createDiagnosisFormGroup());
  }

  removeDiagnostic(index: number): void {
    this.diagnostic.removeAt(index);
  }

  addMedicalExam(): void {
    this.medicalExams.push(this.createMedicalExamFormGroup());
  }

  removeMedicalExam(index: number): void {
    this.medicalExams.removeAt(index);
  }

  addExternalReport(): void {
    this.externalReports.push(this.fb.control('', Validators.required));
  }

  removeExternalReport(index: number): void {
    this.externalReports.removeAt(index);
  }

  getTreatmentFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  getDiagnosisFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  getMedicalExamFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  getExternalReportControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  getExternalReportName(report: string): string {
    if (!report.includes('::')) return report;
    return report.split('::')[0];
  }

  getExternalReportData(report: string): string | null {
    if (!report.includes('::')) return null;
    const key = report.split('::')[1];
    return localStorage.getItem(key);
  }

  isImage(data: string): boolean {
    return data.startsWith('data:image/');
  }

  isPDF(data: string): boolean {
    return data.startsWith('data:application/pdf');
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
  get weightControl(): FormControl {
    return this.medicalForm.get('weight') as FormControl;
  }



  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;

      // Guarda en localStorage con clave por paciente
      const key = `external_report_${this.patient.id}_${Date.now()}`;
      localStorage.setItem(key, base64);

      // Guarda el nombre + clave como referencia en el FormArray
      this.externalReports.push(
        this.fb.control(`${file.name}::${key}`, Validators.required)
      );
    };

    reader.readAsDataURL(file); // base64
  }

  hasValidExternalReports(): boolean {
    return (
      Array.isArray(this.medicalHistory?.external_reports) &&
      this.medicalHistory.external_reports.some((r) => !!r && r.trim() !== '')
    );
  }






  saveChanges(): void {
    if (this.medicalForm.invalid || !this.medicalHistory) return;

    const formValue = this.medicalForm.value;

    const updatedHistory: MedicalHistoryEntity = {
      ...this.medicalHistory,
      ...formValue,
      external_reports: formValue.external_reports.map((r: string) => r.trim()),

      treatment_and_medication: formValue.treatment_and_medication,
      diagnostic: formValue.diagnostic.map((d: { value: string }) => d.value),
      medical_exams: formValue.medical_exams.map((e: { value: string }) => e.value)


    };
// Guarda también en localStorage el listado actualizado de archivos para persistencia local
    localStorage.setItem(`reports_list_${this.patient.id}`, JSON.stringify(updatedHistory.external_reports));

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

  protected readonly length = length;
}
