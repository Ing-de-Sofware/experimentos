import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalhistorypageComponent } from './pages/medicalhistorypage/medicalhistorypage.component';
import { MedicalHistoryRoutingModule } from './medical-history-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [MedicalhistorypageComponent],
  imports: [
    CommonModule,
    MedicalHistoryRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule// 👈 importante
  ]
})
export class MedicalHistoryModule {}
