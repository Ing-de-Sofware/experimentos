import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalhistorypageComponent } from './pages/medicalhistorypage/medicalhistorypage.component';
import { MedicalHistoryRoutingModule } from './medical-history-routing.module';

@NgModule({
  declarations: [MedicalhistorypageComponent],
  imports: [
    CommonModule,
    MedicalHistoryRoutingModule // 👈 importante
  ]
})
export class MedicalHistoryModule {}
