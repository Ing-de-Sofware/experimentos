import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalhistorypageComponent } from './pages/medicalhistorypage/medicalhistorypage.component';
import { MedicalHistoryRoutingModule } from './medical-history-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {IsImagePipe} from "../shared/pipes/is-image.pipe";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [MedicalhistorypageComponent,IsImagePipe],
  imports: [
    CommonModule,
    MedicalHistoryRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinner
  ]
})
export class MedicalHistoryModule {}
