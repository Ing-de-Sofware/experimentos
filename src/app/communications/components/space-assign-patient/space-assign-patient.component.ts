import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-space-assign-patient',
  templateUrl: './space-assign-patient.component.html',
  styleUrl: './space-assign-patient.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
})
export class SpaceAssignPatientComponent {

}
