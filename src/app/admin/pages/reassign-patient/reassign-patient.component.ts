import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reassign-patient',
  templateUrl: './reassign-patient.component.html',
  styleUrls: ['./reassign-patient.component.css']
})
export class ReassignPatientComponent {
  reassignForm: FormGroup;
  successMessage: string | null = null;
  selectedPatient: { id: string; fullName: string; age: number } | null = null;
  selectedDoctorId: string = '';
  doctors = [
    { id: '1', name: 'Dr. Juan Pérez' },
    { id: '2', name: 'Dra. María Rodríguez' },
    { id: '3', name: 'Dr. Luis García' }
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReassignPatientComponent>
  ) {
    this.reassignForm = this.fb.group({
      currentDoctor: ['', Validators.required],
      newDoctor: ['', Validators.required],
      patientName: ['', Validators.required],
      reason: ['', Validators.required]
    });

    this.selectedPatient = {
      id: data.patient.id,
      fullName: `${data.patient.firstName} ${data.patient.lastName}`,
      age: data.patient.age
    };
  }

  onSubmit(): void {
    if (this.reassignForm.valid) {
      const data = this.reassignForm.value;
      console.log('Reassigning patient:', data);
      this.successMessage = `Paciente ${data.patientName} ha sido transferido exitosamente.`;
      this.reassignForm.reset();
    }
  }

  confirmReassignment() {
    console.log('Reassigned to doctor:', this.selectedDoctorId);
    this.successMessage = `Paciente ${this.selectedPatient?.fullName || 'N/A'} ha sido transferido exitosamente.`;
  }

  cancel() {
    this.dialogRef.close();
  }
}
