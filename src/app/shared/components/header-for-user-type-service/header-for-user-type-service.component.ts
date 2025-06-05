import { Component, OnInit } from '@angular/core';
import { UserTypeService } from "../../services/user-type.service";
import { UserType } from '../../model/user-type.model';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { HeaderPatientComponent } from "../../pages/header-patient/header-patient.component";
import { HeaderAdminComponent } from "../../pages/header-admin/header-admin.component";
import { HeaderDoctorComponent } from "../../pages/header-doctor/header-doctor.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-header-for-user-type-service',
  templateUrl: './header-for-user-type-service.component.html',
  styleUrls: ['./header-for-user-type-service.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderPatientComponent,
    HeaderAdminComponent,
    HeaderDoctorComponent,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton
  ]
})
export class HeaderForUserTypeServiceComponent implements OnInit {
  userType: UserType | null = null;

  constructor(private userTypeService: UserTypeService) {}

  ngOnInit(): void {
    // Primero recupera del localStorage de inmediato
    this.userType = this.userTypeService.getUserType();

    // Luego escucha por cambios futuros
    this.userTypeService.userType$.subscribe(type => {
      this.userType = type;
    });
  }
}
