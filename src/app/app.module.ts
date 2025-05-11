import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { HeaderDoctorComponent } from './shared/pages/header-doctor/header-doctor.component';
import {NgOptimizedImage} from "@angular/common";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {LanguageSwitcherComponent} from "./shared/pages/language-switcher/language-switcher.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AuthModule } from './identity-and-access/auth/auth.module';

import { FooterContentComponent } from './public/components/footer-content/footer-content.component';
import { PatientsTableComponent } from './profiles/components/patients-table/patients-table.component';
import { SearchDoctorsComponent } from './shared/pages/search-doctors/search-doctors.component';
import { SearchPatiensComponent } from './profiles/components/search-patiens/search-patiens.component';


import { DoctorChatComponent } from './communications/pages/doctor-chat/doctor-chat.component';
import { PatientChatComponent } from './communications/pages/patient-chat/patient-chat.component';
import { NotificationsViewComponent } from './notifications/pages/notifications-view/notifications-view.component';
import {CalendarViewComponent} from "./calendar/pages/calendar-view/calendar-view.component";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { HomeDoctorComponent } from './profiles/pages/home-doctor/home-doctor.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSort} from "@angular/material/sort";

import { PhotoPatientsComponent } from './profiles/components/photo-patients/photo-patients.component';
import { InfoProfilePatiensComponent } from './profiles/components/info-profile-patiens/info-profile-patiens.component';
import { InfoCardProfilePatiensComponent } from './profiles/components/info-card-profile-patiens/info-card-profile-patiens.component';

import {MatGridList, MatGridTile} from "@angular/material/grid-list";

import { DoctorRegistrationComponent } from './identity-and-access/pages/doctor-registration/doctor-registration.component';
import { HomePatientComponent } from './profiles/pages/home-patient/home-patient.component';
import { PatientsReminderComponent } from './profiles/components/patients-reminder/patients-reminder.component';
import { PatientsUploadExamComponent } from './profiles/components/patients-upload-exam/patients-upload-exam.component';
import { PatientsPendingTaskComponent } from './profiles/components/patients-pending-task/patients-pending-task.component';
import { HeaderPatientComponent } from './shared/pages/header-patient/header-patient.component';
import { CalendarPatientViewComponent } from './calendar/pages/calendar-patient-view/calendar-patient-view.component';


import { BackgroundComponent } from './medical-history/components/background/background.component';


import { HeaderComponent } from './medical-history/components/header/header.component';
import { ClinicalhistoryComponent } from './medical-history/components/clinicalhistory/clinicalhistory.component';
import { DignosesandtreatmentComponent } from './medical-history/components/dignosesandtreatment/dignosesandtreatment.component';
import { ExternalreportsComponent } from './medical-history/components/externalreports/externalreports.component';
import { MedicalexamsComponent } from './medical-history/components/medicalexams/medicalexams.component';
import { PatientdataComponent } from './medical-history/components/patientdata/patientdata.component';
import { ReasonconsultationComponent } from './medical-history/components/reasonconsultation/reasonconsultation.component';
import { MedicalhistorypageComponent } from './medical-history/pages/medicalhistorypage/medicalhistorypage.component';
import { HeaderForUserTypeServiceComponent } from './shared/components/header-for-user-type-service/header-for-user-type-service.component';
import { TreatmentPatientComponent } from './medical-history/pages/treatment-patient/treatment-patient.component';
import { MedicationFormComponent } from './medical-history/components/medication-form/medication-form.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatCalendar } from '@angular/material/datepicker';

import { ButtonSendMessageComponent } from './communications/components/button-send-message/button-send-message.component';
import { DatepickerProfileColleagueComponent } from './communications/components/datepicker-profile-colleague/datepicker-profile-colleague.component';
import { HourpickerProfileColleagueComponent } from './communications/components/hourpicker-profile-colleague/hourpicker-profile-colleague.component';
import { SpaceAssignPatientComponent } from './communications/components/space-assign-patient/space-assign-patient.component';
import { ButtonSaveScheduleComponent } from './communications/components/button-save-schedule/button-save-schedule.component';
import { DoctorViewColleagueComponent } from './communications/components/doctor-view-colleague/doctor-view-colleague.component';
import { ColleagueSearchComponent } from './communications/pages/colleague-search/colleague-search.component';
import { InfoProfileMedicalsComponent } from './profiles/components/info-profile-medicals/info-profile-medicals.component';

import {
    SelectPaymentMethodComponent
} from "./subscriptions-and-payments/pages/select-payment-method/select-payment-method.component";
import { CardModalComponent } from './subscriptions-and-payments/components/card-modal/card-modal.component';

import { Role1Component } from './identity-and-access/components/role1/role1.component';
import { Role2Component } from './identity-and-access/components/role2/role2.component';


import { UserListComponent } from './communications/components/user-list/user-list.component';
import { ChatComponent } from './communications/components/chat-with-other-users/chat.component';
import { DoctorService } from './communications/services/doctor.service';
import {RouterLink} from "@angular/router";


import {CalendarDoctorComponent} from "./calendar/components/calendar-doctor/calendar-doctor.component";
import { AddEventCardComponent } from './calendar/components/add-event-card/add-event-card.component';
import {MatNativeDateModule} from "@angular/material/core";
import {MedicationEntity} from "./medical-history/models/medication.entity";
import { CalendarModule } from './calendar/calendar.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProfilesModule } from './profiles/profiles.module';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

;

@NgModule({
  declarations: [
    AppComponent,
    FooterContentComponent,
    PatientsTableComponent,
    SearchDoctorsComponent,
    SearchPatiensComponent,
    HeaderDoctorComponent,
    LanguageSwitcherComponent,
    DoctorChatComponent,
    PatientChatComponent,
    NotificationsViewComponent,
    HomeDoctorComponent,
    DoctorRegistrationComponent,
    HomePatientComponent,
    PatientsReminderComponent,
    PatientsUploadExamComponent,
    PatientsPendingTaskComponent,
    HeaderPatientComponent,

    BackgroundComponent,
    ClinicalhistoryComponent,
    ExternalreportsComponent,
    HeaderComponent,
    PatientdataComponent,
    DignosesandtreatmentComponent,
    ReasonconsultationComponent,
    HeaderComponent,
    ClinicalhistoryComponent,
    DignosesandtreatmentComponent,
    ExternalreportsComponent,
    MedicalexamsComponent,
    PatientdataComponent,
    ReasonconsultationComponent,

    HeaderForUserTypeServiceComponent,
    TreatmentPatientComponent,
    MedicationFormComponent,

    ColleagueSearchComponent,
    InfoProfileMedicalsComponent,
      ColleagueSearchComponent,
      InfoProfileMedicalsComponent,
        SelectPaymentMethodComponent,
        CardModalComponent,

        Role1Component,
        Role2Component,

        UserListComponent,
        ChatComponent,
        MedicationFormComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbar,
    MatIcon,
    NgOptimizedImage,
    MatSidenav,
    MatSidenavContainer,
    MatIconButton,
    MatSidenavContent,
    MatCardModule,
    MatButton,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,

    /*
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    */
    MatButtonToggleGroup,
    MatButtonToggle,
    MatAnchor,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatSort,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatCheckbox,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardContent,
    MatCardHeader,
    MatCardModule,
    MatGridList,
    MatGridTile,
    MatButton,
    DatepickerProfileColleagueComponent,
    HourpickerProfileColleagueComponent,
    SpaceAssignPatientComponent,

    ButtonSendMessageComponent,
    ButtonSaveScheduleComponent,
    DoctorViewColleagueComponent,
    RouterLink,

    MatNativeDateModule,
    MatDatepickerModule,
    MatCalendar,

    AuthModule,
    CalendarModule,
    NotificationsModule,
    ProfilesModule

  ],
  providers: [
  provideAnimationsAsync(),
    DoctorService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
