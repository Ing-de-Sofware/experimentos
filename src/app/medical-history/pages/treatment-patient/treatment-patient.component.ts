import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MedicationFormComponent} from "../../components/medication-form/medication-form.component";

@Component({
  selector: 'app-treatment-patient',
  templateUrl: './treatment-patient.component.html',
  standalone: true,
  imports: [
    MatGridTile,
    MatLabel,
    MatFormField,
    MatGridList,
    MedicationFormComponent
  ],
  styleUrl: './treatment-patient.component.css'
})
export class TreatmentPatientComponent {

}
