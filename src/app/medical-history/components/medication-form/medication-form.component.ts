import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MedicationService } from '../../services/medication.service';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-medication-form',
  templateUrl: './medication-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIcon
  ],
  styleUrls: ['./medication-form.component.css']
})
export class MedicationFormComponent implements OnInit {
  medicationForm: FormGroup;
  medicalRecordId: number = 1;
  prescriptionId: number = 1;
  medicalTypeId: number = 1;

  constructor(private _formBuilder: FormBuilder, private medicationService: MedicationService) {
    this.medicationForm = this._formBuilder.group({
      name: ['', Validators.required],
      amount: [0, Validators.required],
      unitQ: ['', Validators.required],
      value: [0, Validators.required],
      unit: ['', Validators.required],
      timesPerDay: [0, Validators.required],
      timePeriod: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.medicationService.getMedication(this.medicalRecordId).subscribe(data => {
      this.medicationForm.setValue({
        medicalRecordId: data.medicalRecordId,
        medicalTypeId: data.medicalTypeId,
        prescriptionId: data.prescriptionId,
        drugName: data.drugName,
        quantity: data.quantity,
        unitQ: data.unitQ,
        concentration: data.concentration,
        unit: data.unit,
        frequency: data.frequency,
        duration: data.duration
      });
    });
  }

  submitMedication() {
    if (this.medicationForm.valid) {
      const medicationData = {
        ...this.medicationForm.value,
        medicalRecordId: this.medicalRecordId,
        medicalTypeId: this.medicalTypeId,
        prescriptionId: this.prescriptionId
      };
      this.medicationService.postMedication(medicationData).subscribe(response => {
        console.log(response);
      });
    }
  }
}
