import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalhistorypageComponent } from './pages/medicalhistorypage/medicalhistorypage.component';

const routes: Routes = [
  { path: 'medical-history-page/:id', component: MedicalhistorypageComponent } // 👈 tal como tú quieres
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalHistoryRoutingModule {}
