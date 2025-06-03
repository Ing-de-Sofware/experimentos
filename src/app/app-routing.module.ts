import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalendarViewComponent} from './calendar/pages/calendar-view/calendar-view.component';
import {DoctorChatComponent} from './communications/pages/doctor-chat/doctor-chat.component';
import {NotificationsViewComponent} from './notifications/pages/notifications-view/notifications-view.component';
import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {DoctorProfileComponent} from './profiles/pages/doctor-profile/doctor-profile.component';
import {HomeDoctorComponent} from './profiles/pages/home-doctor/home-doctor.component';
import {HomePatientComponent} from './profiles/pages/home-patient/home-patient.component';
import {CalendarPatientViewComponent} from './calendar/pages/calendar-patient-view/calendar-patient-view.component';
import {PatientChatComponent} from './communications/pages/patient-chat/patient-chat.component';
import {
  NotificationsPatientsComponent
} from './notifications/pages/notifications-patients/notifications-patients.component';
import {PatientProfileComponent} from './profiles/pages/patient-profile/patient-profile.component';
import {SelectUserRoleComponent} from './identity-and-access/pages/select-user-role/select-user-role.component';
import {HeaderDoctorComponent} from './shared/pages/header-doctor/header-doctor.component';
import {HeaderPatientComponent} from './shared/pages/header-patient/header-patient.component';
import {
  ReasonconsultationComponent
} from './medical-history/components/reasonconsultation/reasonconsultation.component';
import {BackgroundComponent} from './medical-history/components/background/background.component';
import {MedicalexamsComponent} from './medical-history/components/medicalexams/medicalexams.component';
import {ExternalreportsComponent} from './medical-history/components/externalreports/externalreports.component';
import {
  DignosesandtreatmentComponent
} from './medical-history/components/dignosesandtreatment/dignosesandtreatment.component';
import {TreatmentPatientComponent} from './medical-history/pages/treatment-patient/treatment-patient.component';
import {LoginComponent} from './identity-and-access/auth/components/login/login.component';
import {RegisterComponent} from './identity-and-access/auth/components/register/register.component';
import {ForgotPasswordComponent} from './identity-and-access/auth/components/forgot-password/forgot-password.component';
import {AdminDashboardComponent} from "./admin/pages/admin-dashboard/admin-dashboard.component";
import {AnnouncementsAdminComponent} from "./notifications/pages/announcements-admin/announcements-admin.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'selectRole', component: SelectUserRoleComponent},
  {path: 'headerDoctor', component: HeaderDoctorComponent},
  {path: 'headerPatient', component: HeaderPatientComponent},
  {path: 'homeDoctor', component: HomeDoctorComponent},
  {path: 'homePatient', component: HomePatientComponent},
  {path: 'adminDashboard', component: AdminDashboardComponent},
  {
    path: 'available-doctors',
    loadComponent: () =>
      import('../../src/app/profiles/components/available-doctors/available-doctors.component').then(m => m.AvailableDoctorsComponent)
  },
  {
    path: 'doctor-profile/:id',
    loadComponent: () => import('../../src/app/profiles/components/doctor-profile/doctor-profile.component').then(m => m.DoctorProfileComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  {

    path: 'appointments/:id',
    loadComponent: () => import('../../src/app/profiles/components/appointments/appointments.component').then(m => m.AppointmentsComponent)
  },
  //{ path: 'notifications', component: NotificationsComponent },
  //{ path: 'settings', component: SettingsComponent },
  // { path: 'appointments', component: AppointmentsComponent },
  {path: 'announcements', component: AnnouncementsAdminComponent},
  //{path: 'user-management', component: UserManagementComponent},
  // { path: 'reassing-Patients', component: ReassignPatientsComponent},
  //{path: 'accessLogs', component: AccessLogsComponent // Este deberás crearlo },
  //{path: 'supportChat', component: SupportChatComponent // Este deberás crearlo}
  //{ path: 'admin-stats', component: AdminStatsComponent }
  //{path: 'logs', component: LogsComponent
  //{path: 'support', component: SupportComponent
  {
    path: 'calendar',
    loadChildren: () =>
      import('./calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  },

  {path: 'messages', component: DoctorChatComponent},
  {path: 'notifications', component: NotificationsViewComponent},
  {path: 'doctorProfile', component: DoctorProfileComponent},
  {path: 'calendarPatientView', component: CalendarPatientViewComponent},
  {path: 'messagesPatient', component: PatientChatComponent},
  {path: 'notificationsPatient', component: NotificationsPatientsComponent},
  {path: 'patientProfile', component: PatientProfileComponent},
  {
    path: 'medical-history',
    loadChildren: () =>
      import('./medical-history/medical-history.module').then(m => m.MedicalHistoryModule)
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
