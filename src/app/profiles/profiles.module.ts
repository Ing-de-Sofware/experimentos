import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

// Componentes
import { DoctorProfileComponent } from './pages/doctor-profile/doctor-profile.component';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';
import { PhotoPatientsComponent } from './components/photo-patients/photo-patients.component';
import { InfoProfilePatiensComponent } from './components/info-profile-patiens/info-profile-patiens.component';
import { InfoCardProfilePatiensComponent } from './components/info-card-profile-patiens/info-card-profile-patiens.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    DoctorProfileComponent,
    PatientProfileComponent,
    PhotoPatientsComponent,
    InfoProfilePatiensComponent,
    InfoCardProfilePatiensComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    SharedModule
  ],
  exports: [
    DoctorProfileComponent,
    PatientProfileComponent
  ]
})
export class ProfilesModule { }
