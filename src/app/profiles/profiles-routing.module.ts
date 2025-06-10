import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreatmentPatientComponent } from './pages/treatment-patient/treatment-patient.component';
// Importa aquí otros componentes de páginas si los tienes, por ejemplo:
// import { HomePatientComponent } from './pages/home-patient/home-patient.component';

const routes: Routes = [
  // { path: '', component: HomePatientComponent }, // Ruta base, si existe home
  { path: 'treatment-status', component: TreatmentPatientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
