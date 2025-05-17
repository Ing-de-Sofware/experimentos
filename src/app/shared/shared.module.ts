import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './pages/header-admin/header-admin.component';
import { HeaderDoctorComponent } from './pages/header-doctor/header-doctor.component';
import { HeaderPatientComponent } from './pages/header-patient/header-patient.component';
import { LanguageSwitcherComponent } from './pages/language-switcher/language-switcher.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {FooterContentComponent} from "../public/components/footer-content/footer-content.component";
import {ColleagueSearchComponent} from "../communications/pages/colleague-search/colleague-search.component";
import {FormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {
  HeaderForUserTypeServiceComponent
} from "./components/header-for-user-type-service/header-for-user-type-service.component";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {MatNavList} from "@angular/material/list";
import { PrivacyDialogComponent } from './components/privacy-dialog/privacy-dialog.component';
import { TermsDialogComponent } from './components/terms-dialog/terms-dialog.component';
import { PrivacyPolicyPersonalDataProcessingComponent } from './components/privacy-policy-personal-data-processing/privacy-policy-personal-data-processing.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";


@NgModule({
  declarations: [
    HeaderDoctorComponent,
    HeaderPatientComponent,
    HeaderAdminComponent,
    LanguageSwitcherComponent,
    FooterContentComponent,
    ColleagueSearchComponent,
    HeaderForUserTypeServiceComponent,
    PrivacyPolicyPersonalDataProcessingComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavContainer,
    MatNavList,
    PrivacyDialogComponent,
    TermsDialogComponent,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  exports: [
    HeaderDoctorComponent,
    HeaderPatientComponent,
    HeaderAdminComponent,
    LanguageSwitcherComponent,
    FooterContentComponent,
    ColleagueSearchComponent,
    HeaderForUserTypeServiceComponent
  ]
})
export class SharedModule {}
